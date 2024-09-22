import { generateEducationHistory } from "@/lib/ai-actions";
import Dashboard from "./dashboard";
import { getProfile, getResumeList } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default async function Page() {

    // Get profile and resume list
    const [data, resumeList] = await Promise.all([
        getProfile(),
        getResumeList()
    ]);

    return <Dashboard resumeList={resumeList} />
}