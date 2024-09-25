'use server';

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { Resume, UserProfile } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { convertProfileSkillsToResumeSkills, convertProfileWorkExperienceToResumeWorkExperience } from '@/lib/ai-actions';

// Create a new PocketBase instance for each request
function getPocketBaseInstance() {
  return new PocketBase(process.env.POCKETBASE_URL);
}

// Helper function to revalidate all paths
function revalidateAll() {
  revalidatePath('/', 'layout');
}

// Helper function to load authentication from cookie
function loadAuthFromCookie(pb: PocketBase): boolean {
  const cookie = cookies().get('pb_auth');
  if (!cookie) {
    return false;
  }
  const authData = JSON.parse(cookie.value);
  pb.authStore.save(authData.token, authData.model);
  return pb.authStore.isValid;
}

// Login
export async function login(formData: FormData) {
  const pb = getPocketBaseInstance();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password);

    const cookieData = JSON.stringify({
      token,
      model: {
        id: model.id,
        email: model.email,
        username: model.username,
      }
    });

    cookies().set('pb_auth', cookieData, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  } finally {
    redirect('/dashboard');
  }
}

// Logout
export async function logout() {
  cookies().delete('pb_auth');
  redirect('/');
}

// ------- Resumes ------- //

// Save Resume
export async function saveResume(resumeData: Resume): Promise<{ success: boolean, message: string }> {
  const pb = getPocketBaseInstance();
  if (!loadAuthFromCookie(pb)) {
    return { success: false, message: 'Not authenticated' };
  }

  try {
    await pb.collection('resumes').update(resumeData.id, {
      name: resumeData.name,
      resume_name: resumeData.resume_name,
      skills: resumeData.skills,
      education_history: resumeData.education_history,
      work_history: resumeData.work_history,
      projects: resumeData.projects,
    });

    revalidateAll();
    return { success: true, message: 'Resume saved successfully' };
  } catch (error) {
    console.error('Error saving resume:', error);
    return { success: false, message: 'Failed to save resume' };
  }
}

// Create Resume
export async function createResume(resumeName: string, useProfile: boolean) {
  const pb = getPocketBaseInstance();

  const profile: UserProfile = await getProfile();
  const currentUserId = profile.id;

  let data: Record<string, any> = {
    "name": profile.first_name + " " + profile.last_name || "",
    "resume_name": resumeName,
    "user": profile.id,
    "linkedin": profile.Linkedin || "",
    "github": profile.Github || "",
    "portfolio": profile.Portfolio || "",
    "skills": [],
    "education_history": [],
    "work_history": [],
    "projects": [],
    "email": profile.email || "",
  };

  const record = await pb.collection('resumes').create(data);

  try {
    if (useProfile) {
      const [convertedSkills, convertedWorkExperience] = await Promise.all([
        convertProfileSkillsToResumeSkills(),
        convertProfileWorkExperienceToResumeWorkExperience()
      ]);

      // console.log('CONVERTED SKILLS ----------------------------------------');
      // console.log(convertedSkills);
      console.log('CONVERTED WORK EXPERIENCE -------------------------------');
      console.log(convertedWorkExperience);

      await pb.collection('resumes').update(record.id, {
        "skills": convertedSkills,
        "work_history": convertedWorkExperience,
        "education_history": profile.education_history
        
      });
    }

    revalidateAll();
    return { 
      success: true, 
      message: 'Resume created successfully', 
      id: record.id 
    };
  } catch (error) {
    console.error('Error creating resume:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to create resume' 
    };
  }
}

export async function deleteResume(resumeId: string) {
  const pb = getPocketBaseInstance();
  if (!loadAuthFromCookie(pb)) {
    return { success: false, message: 'Not authenticated' };
  }

  try {
    await pb.collection('resumes').delete(resumeId);
    revalidateAll();
    return { success: true, message: 'Resume deleted successfully' };
  } catch (error) {
    console.error('Error deleting resume:', error);
    return { success: false, message: 'Failed to delete resume' };
  }
}

export async function getResumeList(): Promise<Resume[]> {
  const pb = getPocketBaseInstance();
  if (!loadAuthFromCookie(pb)) {
    return [];
  }

  const currentUserId = pb.authStore.model?.id;

  if (!currentUserId) {
    return [];
  }

  try {
    const resumeList = await pb.collection('resumes').getList(1, 8, {
      filter: `user = "${currentUserId}"`
    });
    return resumeList.items as Resume[];
  } catch (error) {
    console.error('Error fetching resume list:', error);
    return [];
  }
}

export async function getResume(id: string): Promise<Resume | null> {
  const pb = getPocketBaseInstance();
  if (!loadAuthFromCookie(pb)) {
    return null;
  }

  try {
    const resume = await pb.collection('resumes').getOne(id) as Resume;
    return resume;
  } catch (error) {
    console.error('Error fetching resume:', error);
    return null;
  }
}

// ------- Profiles ------- //

export async function getProfile() {
  const pb = getPocketBaseInstance();
  
  if (!loadAuthFromCookie(pb)) {
    redirect('/');
  }

  const currentUserId = pb.authStore.model?.id;

  if (!currentUserId) {
    throw new Error('User ID not found');
  }

  try {
    const record = await pb.collection('users').getOne(currentUserId);
    return record as UserProfile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function updateProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean; message: string }> {
  const pb = getPocketBaseInstance();
  if (!loadAuthFromCookie(pb)) {
    return { success: false, message: 'Not authenticated' };
  }

  const currentUserId = pb.authStore.model?.id;

  try {
    const data: Partial<UserProfile> = {
      username: profileData.username,
      emailVisibility: profileData.emailVisibility,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      skills: profileData.skills,
      work_history: profileData.work_history,
      education_history: profileData.education_history,
      projects: profileData.projects,
      Linkedin: profileData.Linkedin,
      Github: profileData.Github,
      Portfolio: profileData.Portfolio,
    };

    // Remove undefined fields
    Object.keys(data).forEach(key => {
      if (data[key as keyof Partial<UserProfile>] === undefined) {
        delete data[key as keyof Partial<UserProfile>];
      }
    });

    await pb.collection('users').update(currentUserId, data);
    revalidateAll();

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to update profile' 
    };
  }
}

export async function createProfile(
  first_name: string,
  last_name: string,
  user_name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ success: boolean; message: string }> {
  const pb = getPocketBaseInstance();
  try {
    const newUserData = {
      username: user_name,
      email,
      emailVisibility: true,
      password,
      passwordConfirm: confirmPassword,
      first_name,
      last_name,
      skills: "[]",
      work_history: "[]",
      education_history: "[]",
      projects: "[]",
      Linkedin: "",
      Github: "",
      Portfolio: ""
    };
    
    const createdUser = await pb.collection('users').create(newUserData);

    // Automatically log in the user
    const { token, record: model } = await pb.collection('users').authWithPassword(email, password);

    // Prepare cookie data
    const cookieData = JSON.stringify({
      token,
      model: {
        id: model.id,
        email: model.email,
        username: model.username,
      }
    });

    // Set the cookie
    cookies().set('pb_auth', cookieData, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });

    redirect('/dashboard');

    return { success: true, message: 'Profile created and logged in successfully' };
  } catch (error) {
    console.error('Error creating profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create profile';

    return { 
      success: false, 
      message: errorMessage
    };
  }
}