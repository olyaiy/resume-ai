import { convertProfileSkillsToResumeSkills, generateEducationHistory, generateProjects, generateSkills } from "@/lib/ai-actions";

export default async function Page() {

    const result = await convertProfileSkillsToResumeSkills()
    // console.log('FINAL RESULT ----------------------------------------');
    // console.log(result);

return (
        <div></div>
    );
}