import { generateEducationHistory, generateProjects, generateSkills } from "@/lib/ai-actions";

export default async function Page() {

    const educationHistory = await generateSkills('i made an ai resume builder with next.js react tailwind, put it on github.');
    return (
        <div></div>
    );
}