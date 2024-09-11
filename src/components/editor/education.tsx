import { Resume } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function EducationHistory({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    return (

               <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Education History</h2>
                    {resume.education_history.map((edu, index) => (
                        <div key={index} className="space-y-2 border p-4 rounded relative bg-card">
                            <div className="w-full flex justify-end gap-2">
                                {/* Institution Name */}
                                <label className="w-24">Institution:</label>
                                <Input
                                    value={edu.institution}
                                    // onChange={(e) => handleArrayChange<Education>('education_history', index, 'institution', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Institution"
                                />

                                <Button variant={'destructive'} className=" top-4 right-4">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            
                            

                            {/* Degree */}
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Degree:</label>
                                <Input
                                    value={edu.degree}
                                    // onChange={(e) => handleArrayChange<Education>('education_history', index, 'degree', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Degree"
                                />
                            </div>

                           
                            {/* Start Date */}
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Dates:</label>
                                <Input
                                    type="text"
                                    value={edu.date}
                                    // onChange={(e) => handleArrayChange<Education>('education_history', index, 'startDate', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Start Date"
                                />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Description:</label>
                                <Textarea
                                    value={edu.description || ''}
                                    // onChange={(e) => handleArrayChange<Education>('education_history', index, 'description', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Description (optional)"
                                />
                            </div>
                            
                        </div>
                    ))}
                    <Button>
                        <PlusCircle className="h-4 w-4" />
                    </Button>
                    
                    
                </div> 
    );
}