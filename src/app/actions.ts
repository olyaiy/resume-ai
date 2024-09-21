'use server';

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { Resume, UserProfile } from '@/lib/types';
import { revalidatePath } from 'next/cache';

const pb = new PocketBase(process.env.POCKETBASE_URL);

// Helper function to revalidate all paths
function revalidateAll() {
  revalidatePath('/', 'layout');
}

// Helper function to load authentication from cookie
function loadAuthFromCookie(): boolean {
  const cookie = cookies().get('pb_auth');

  if (!cookie) {
    console.log('Authentication cookie not found');
    return false;
  }

  // Parse the authentication data from the cookie
  const authData = JSON.parse(cookie.value);

  // Load the authentication token into the authStore
  pb.authStore.save(authData.token, authData.model);

  console.log('Authentication store after loading from cookie:', pb.authStore);

  if (!pb.authStore.isValid) {
    console.log('Invalid authentication token');
    return false;
  }

  return true;
}

// Login
export async function login(formData: FormData) {
  console.log('Login function called');

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    console.log('Attempting authentication with PocketBase');
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password);

    console.log('Authentication successful');

    // Prepare cookie data
    const cookieData = JSON.stringify({
      token,
      model: {
        id: model.id,
        email: model.email,
        username: model.username,
      }
    });

    // Set the cookie without additional encoding
    cookies().set('pb_auth', cookieData, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });
    console.log('Cookie set successfully');

    console.log('Redirecting to dashboard');
    
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

export async function saveResume(resumeData: Resume): Promise<{ success: boolean, message: string }> {
  if (!loadAuthFromCookie()) {
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const record = await pb.collection('resumes').update(resumeData.id, {
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

export async function createResume(resumeName: string) {
  // Check if authentication is valid
  if (!loadAuthFromCookie()) {
    return { success: false, message: 'Not authenticated' };
  }

  const currentUserId = pb.authStore.model?.id;

  try {
    const data = {
      "name": "test",
      "skills": [],
      "education_history": [],
      "work_history": [],
      "projects": [],
      "field": currentUserId,
      "resume_name": resumeName,
      "linkedin": "https://example.com",
      "github": "https://example.com",
      "portfolio_site": "https://example.com"
    };

    const record = await pb.collection('resumes').create(data);
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
  if (!loadAuthFromCookie()) {
    return { success: false, message: 'Not authenticated' };
  }

  await pb.collection('resumes').delete(resumeId);
  revalidateAll();
}

// ------- Profiles ------- //

export async function getProfile() {

  if (!loadAuthFromCookie()) {
    redirect('/');

  }

  const currentUserId = pb.authStore.model?.id;
  const record = await pb.collection('users').getOne(currentUserId);

  console.log('Profile record:', record);

  return record as UserProfile;
}

export async function updateProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean; message: string }> {
  if (!loadAuthFromCookie()) {
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

    const record = await pb.collection('users').update(currentUserId, data);
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
  console.log('Creating profile for:', user_name);
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
    
    console.log('Attempting to create user with data:', { ...newUserData, password: '[REDACTED]', passwordConfirm: '[REDACTED]' });
    const createdUser = await pb.collection('users').create(newUserData);
    console.log('User created successfully with ID:', createdUser.id);
    return { success: true, message: 'Profile created successfully' };
  } catch (error) {
    console.error('Error creating profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create profile';
    console.log('Returning error message:', errorMessage);
    return { 
      success: false, 
      message: errorMessage
    };
  }
}