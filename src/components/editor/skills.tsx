import { Resume, Skill } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function Skills({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    // Handler for skill change
    const handleSkillChange = (index: number, field: 'category' | 'skills', value: string) => {
        const updatedSkills = [...resume.skills];
        if (field === 'category') {
            const oldCategory = Object.keys(updatedSkills[index])[0];
            updatedSkills[index] = { [value]: updatedSkills[index][oldCategory] };
        } else {
            const category = Object.keys(updatedSkills[index])[0];
            updatedSkills[index] = { [category]: value };
        }
        setResume({ ...resume, skills: updatedSkills });
    };

    // Handler for removing a skill
    const removeSkillCategory = (index: number) => {
        const updatedSkills = resume.skills.filter((_, i) => i !== index);
        setResume({ ...resume, skills: updatedSkills });
    };

    // Handler for adding a skill
    const addSkillCategory = () => {
        const newSkill: Skill = { "New Category": "" };
        setResume({ ...resume, skills: [...resume.skills, newSkill] });
    };
    
    
    return (
        <div className="space-y-2">
             <h2 className="text-xl font-semibold">Skills</h2>
 
             {resume.skills.map((skill, index) => {
                 const category = Object.keys(skill)[0];
                 const skillsList = skill[category];
 
                 return (
                     <div key={index} className="flex items-center flex-col w-full gap-2 pb-4 bg-card p-4 border rounded">
                         <div className="flex flex-row w-full gap-4 items-stretch justify-stretch">
                             <Input
                                 type="text"
                                 value={category}
                                 onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                 className="w-full p-2 border rounded"
                                 placeholder="Skill Category"
                             />
                             
                             <Button 
                                 variant={'destructive'} 
                                 className="ml-auto"
                                 onClick={() => removeSkillCategory(index)}
                             >
                                 <Trash2 className="h-4 w-4" />
                             </Button>
                         </div>
 
                         <Textarea
                             value={skillsList}
                             onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
                             className="flex-grow p-2 border rounded"
                             placeholder="Skills (comma-separated)"
                         />
                     </div>
                 );
             })}
 
             <Button 
                 onClick={addSkillCategory} 
                 className="mt-2"
             >
                <PlusCircle className="h-4 w-4 mr-2" />
                 Add Skill Category
             </Button>
         </div>
     );
 }