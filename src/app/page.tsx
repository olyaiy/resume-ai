import HomePage from "@/components/home-page";

import PocketBase from 'pocketbase';



// Fetch resumes from PocketBase
async function getResumes() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  try {
    const records = await pb.collection('resumes').getFullList({
      sort: '-created',
    });
    console.log('Fetched resumes:', records);
    return records;
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
}


export default async function Home() {
  const resumes = await getResumes();

  // Get the first resume (assuming we're working with one resume for now)
  const resume = resumes[0];



  return (
    <main className="flex min-h-screen bg-zinc-200">
      <HomePage resume={resume}/>
    </main>
  );
}