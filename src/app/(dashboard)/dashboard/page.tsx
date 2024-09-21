import Dashboard from "./dashboard";
import { getProfile, getResumeList } from "@/app/actions";

export default async function Page() {
    // Get profile and resume list
    const [data, resumeList] = await Promise.all([
        getProfile(),
        getResumeList()
    ]);

    return <Dashboard resumeList={resumeList} />
}