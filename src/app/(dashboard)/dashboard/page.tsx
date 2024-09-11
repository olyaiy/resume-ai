import Dashboard from "./dashboard";
import PocketBase from 'pocketbase';
import { Resume } from '@/lib/types';


const pb = new PocketBase('http://127.0.0.1:8090');



export default async function Page() {
    // fetch a paginated records list
    const resumeList = (await pb.collection('resumes').getList(1, 8)).items as Resume[];



    
    return <Dashboard resumeList={resumeList}/>
}
