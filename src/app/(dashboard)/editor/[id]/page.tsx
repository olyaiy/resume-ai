
import PocketBase from 'pocketbase';
import EditorLayout from '../editor-layout';
import { Resume } from '@/lib/types';


const pb = new PocketBase('http://127.0.0.1:8090');

export async function saveResume(resumeData: Resume) {

    const record = await pb.collection('resumes').update(resumeData.id, resumeData);

}



export default async function Page({ params }: { params: { id: string } }) {

    const resume = await pb.collection('resumes').getOne(params.id) as Resume;

    
    return <EditorLayout 
        resumeData={resume}
    />;
}