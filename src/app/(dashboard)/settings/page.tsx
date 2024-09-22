import { generateEducationHistory, generateProjects } from "@/lib/ai-actions";

export default async function Page() {

    const educationHistory = await generateProjects('i made an ai resume builder with next.js react tailwind, put it on github.');
    return (
        <div></div>
    );
}