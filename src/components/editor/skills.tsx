import { Resume } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function Skills({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    return (
       <>
       <div className="space-y-2 bg-card p-4 border rounded">
                    {/* Skills section heading */}
                    <h2 className="text-xl font-semibold">
                        Skills
                    </h2>

                    {/*  */}
                    <button onClick={ ()=> console.log(resume.skills)}/>
                        
                    {resume.skills.map((skill, index) => (
                        <div key={index} className="flex items-center flex-col w-full gap-2 pb-4">
                            <div className="flex flex-row w-full gap-4 items-stretch justify-stretch">
                                <input
                                    type="text"
                                    value={skill.category}
                                    // onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                    className="w-full p-2 border rounded"
                                    placeholder="Skill Category"
                                />
                                
                                <Button variant={'destructive'} className="ml-auto"
                                // onClick={() => removeSkillCategory(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <Textarea
                                value={skill.skills}
                                // onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
                                className="flex-grow p-2 border rounded"
                                placeholder="Skills (comma-separated)"
                            />
                        </div>
                    ))}
                    <Button 
                    // onClick={addSkillCategory} 
                    className="mt-2">
                        Add Skill Category
                    </Button>
                </div>
       
       </>
    );
}