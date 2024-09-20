'use server';

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { Resume, UserProfile } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { AuthError } from '@/lib/types';

const pb = new PocketBase(process.env.POCKETBASE_URL);

// Helper function to revalidate all paths
function revalidateAll() {
  revalidatePath('/', 'layout');
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
  const cookie = cookies().get('pb_auth');

  if (!cookie) {
    console.log('Authentication cookie not found');
    return { success: false, message: 'Authentication cookie not found' };
  }

  // Parse the authentication data from the cookie
  const authData = JSON.parse(cookie.value);

  // Load the authentication token into the authStore
  pb.authStore.save(authData.token, authData.model);

  console.log('Authentication store after loading from cookie:', pb.authStore);

  if (!pb.authStore.isValid) {
    console.log('Invalid authentication token');
    return { success: false, message: 'Invalid authentication token' };
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
  const cookie = cookies().get('pb_auth');

  if (cookie) {
    console.log('Authentication cookie found:', cookie.value);

    // Parse the authentication data from the cookie
    const authData = JSON.parse(cookie.value);

    // Load the authentication token into the authStore
    pb.authStore.save(authData.token, authData.model);

    console.log('Authentication store after loading from cookie:', pb.authStore);

    if (pb.authStore.isValid) {
      console.log('Authentication is valid');

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
    } else {
      console.log('Invalid authentication token');
      return { success: false, message: 'Invalid authentication token' };
    }
  } else {
    console.log('Authentication cookie not found');
    return { success: false, message: 'Authentication cookie not found' };
  }
}

// export async function deleteResume(resumeId: string) {
//   loadAuthFromCookie();
//   if (!pb.authStore.isValid) {
//     return { success: false, message: 'Not authenticated' };
//   }

//   await pb.collection('resumes').delete(resumeId);
//   revalidateAll();
// }

// ------- Profiles ------- //

// export async function getProfile() {
//   loadAuthFromCookie();
//   if (!pb.authStore.isValid) {
//     throw new Error('Not authenticated');
//   }

//   const currentUserId = pb.authStore.model?.id;
//   const record = await pb.collection('users').getOne(currentUserId);

//   return record as UserProfile;
// }

// export async function updateProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean; message: string }> {
//   loadAuthFromCookie();
//   if (!pb.authStore.isValid) {
//     return { success: false, message: 'Not authenticated' };
//   }

//   const currentUserId = pb.authStore.model?.id;

//   try {
//     const data: Partial<UserProfile> = {
//       username: profileData.username,
//       emailVisibility: profileData.emailVisibility,
//       first_name: profileData.first_name,
//       last_name: profileData.last_name,
//       skills: profileData.skills,
//       work_history: profileData.work_history,
//       education_history: profileData.education_history,
//       projects: profileData.projects,
//       Linkedin: profileData.Linkedin,
//       Github: profileData.Github,
//       Portfolio: profileData.Portfolio,
//     };

//     // Remove undefined fields
//     Object.keys(data).forEach(key => {
//       if (data[key as keyof Partial<UserProfile>] === undefined) {
//         delete data[key as keyof Partial<UserProfile>];
//       }
//     });

//     const record = await pb.collection('users').update(currentUserId, data);
//     revalidateAll();

//     return { success: true, message: 'Profile updated successfully' };
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return { 
//       success: false, 
//       message: error instanceof Error ? error.message : 'Failed to update profile' 
//     };
//   }
// }