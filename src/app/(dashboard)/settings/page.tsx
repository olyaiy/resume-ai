import { generateEducationHistory } from "@/lib/ai-actions";

export default async function Page() {

    const educationHistory = await generateEducationHistory('i went to ubc in 2024 to study comp sci');
    return (
        <div></div>
    );
}