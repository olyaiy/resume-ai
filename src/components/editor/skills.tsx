import { Resume, Skill } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function Skills({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    // Ensure skills is always an array
    const skills = Array.isArray(resume.skills) ? resume.skills : [];

    // Handler for skill change
    const handleSkillChange = (index: number, field: 'category' | 'skills', value: string) => {
        const updatedSkills = [...skills];
        if (field === 'category') {
            const oldCategory = Object.keys(updatedSkills[index])[0] || '';
            updatedSkills[index] = { [value]: updatedSkills[index][oldCategory] || '' };
        } else {
            const category = Object.keys(updatedSkills[index])[0] || 'New Category';
            updatedSkills[index] = { [category]: value };
        }
        setResume({ ...resume, skills: updatedSkills });
    };

    // Handler for removing a skill
    const removeSkillCategory = (index: number) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setResume({ ...resume, skills: updatedSkills });
    };

    // Handler for adding a skill
    const addSkillCategory = () => {
        const newSkill: Skill = { "New Category": "" };
        setResume({ ...resume, skills: [...skills, newSkill] });
    };
    
    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {skills.length === 0 ? (
                    <p className="text-center text-muted-foreground">No skills added yet.</p>
                ) : (
                    skills.map((skill, index) => {
                        const category = Object.keys(skill)[0] || '';
                        const skillsList = skill[category] || '';

                        return (
                            <div key={index} className="flex items-center flex-col w-full gap-2 pb-4 bg-card p-4 border rounded">
                                <div className="flex flex-row w-full gap-4 items-stretch justify-stretch">
                                    <Input
                                        type="text"
                                        value={category}
                                        onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                        className="w-full"
                                        placeholder="Skill Category"
                                    />
                                    
                                    <Button 
                                        variant="destructive" 
                                        size="icon"
                                        onClick={() => removeSkillCategory(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Textarea
                                    value={skillsList}
                                    onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
                                    className="w-full"
                                    placeholder="Skills (comma-separated)"
                                />
                            </div>
                        );
                    })
                )}

                <Button 
                    onClick={addSkillCategory} 
                    className="w-full"
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Skill Category
                </Button>
            </div>
        </div>
    );
}