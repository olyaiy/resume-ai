'use server';

import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';
import { Resume } from '@/lib/types';


const pb = new PocketBase(process.env.POCKETBASE_URL);
  


//  -----  AUTH -----
export async function isAuthenticated() {
  const pb = new PocketBase(process.env.POCKETBASE_URL);
  const cookieStore = cookies();
  const authCookie = cookieStore.get('pb_auth');

  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value);
      pb.authStore.save(authData.token, authData.model);
      return pb.authStore.isValid;
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
    }
  }
  return false;
}
export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // TODO: server-side validation

  const pb = new PocketBase(process.env.POCKETBASE_URL);

  try {
    console.log('starting...')
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password);

    const cookie = JSON.stringify({ token, model });

    cookies().set('pb_auth', cookie, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });

  } catch (error) {
  // Redirect to login page with error parameter
    redirect('/sign-in?error=AuthFailed');
    }
    if (await isAuthenticated()) {
      redirect('/dashboard');
  }
} 
export async function logout() {
  cookies().delete('pb_auth');
  redirect('/');
}
export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;

  // TODO: server-side validation
  if (password !== passwordConfirm) {
    redirect('/sign-up?error=PasswordMismatch');
  }

  const pb = new PocketBase(process.env.POCKETBASE_URL);

  try {
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
    });

    // Automatically log in the user after successful signup
    const { token, record: model } = await pb
      .collection('users')
      .authWithPassword(email, password);

    const cookie = JSON.stringify({ token, model });

    cookies().set('pb_auth', cookie, {
      secure: true,
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });

    redirect('/dashboard');
  } catch (error) {
    // Handle specific error cases if needed
    console.error('Signup error:', error);
    redirect('/sign-up?error=SignupFailed');
  }
}

// Save Resume
export async function saveResume(resumeData: Resume): Promise<{ success: boolean, message: string }> {
  
  try {
    const record = await pb.collection('resumes').update(resumeData.id, {
      name: resumeData.name,
      resume_name: resumeData.resume_name,
      skills: resumeData.skills,
      education_history: resumeData.education_history,
      work_history: resumeData.work_history,
      projects: resumeData.projects,
    });
    
    console.log('Resume saved successfully:', record);

    return { success: true, message: 'Resume saved successfully' };
  } catch (error) {
    console.error('Error saving resume:', error);
    return { success: false, message: 'Failed to save resume' };
  }
}

// New Resume
export async function createResume(resumeName: string){
  // Get the cookie from the request
  const cookieStore = cookies();
  const authCookie = cookieStore.get('pb_auth');

  
  if (authCookie) {
    // Load the auth data from the cookie
    pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);
  }

  const currentUserId: string = pb.authStore.model?.id ?? '';
  
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

    console.log('Resume created successfully:', record);

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

