
import PocketBase from 'pocketbase';
import EditorLayout from '../editor-layout';
import { Resume, UserProfile } from '@/lib/types';
import { getProfile } from '@/app/actions';

const pb = new PocketBase('http://127.0.0.1:8090');


export default async function Page({ params }: { params: { id: string } }) {

    const data: UserProfile = await getProfile();
    const resume = await pb.collection('resumes').getOne(params.id) as Resume;



    if (resume.user !== data.id) {
        return <div>Unauthorized</div>
    }

    
    return <EditorLayout 
        resumeData={resume}
    />;
}