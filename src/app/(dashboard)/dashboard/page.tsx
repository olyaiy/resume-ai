import Dashboard from "./dashboard";
import PocketBase from 'pocketbase';
import { Resume, UserProfile } from '@/lib/types';
import { getProfile } from "@/app/actions";

const pb = new PocketBase('http://127.0.0.1:8090');

export default async function Page() {

    // Get profile
    const data: UserProfile = await getProfile();
    
    // Get resumes, filter by profile id
    const resumeList = (
        await pb.collection('resumes').getList(1, 8, {
            filter: `field = "${data.id}"`
        })
    ).items as Resume[];
    
    console.log(resumeList)

    return <Dashboard resumeList={resumeList}/>
}
