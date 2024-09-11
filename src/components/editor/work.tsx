import { Resume } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function Work({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            {resume.work_history.map((work, index) => (
                <div key={index} className="space-y-4 border p-4 rounded bg-card">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Work Experience {index + 1}</h3>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    {/* Form fields */}
                    <div className="grid gap-4">
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <label>Company:</label>
                            <Input
                                value={work.company}
                                // onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'company', e.target.value)}
                                placeholder="Company"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <label>Position:</label>
                            <Input
                                value={work.position}
                                // onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'position', e.target.value)}
                                placeholder="Position"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <label>Date:</label>
                            <Input
                                type="text"
                                value={work.date}
                                // onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'startDate', e.target.value)}
                                placeholder="E.g. Aug 2024 - Dec 2025"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-start">
                            <label>Description:</label>
                            <Textarea
                                value={work.description}
                                // onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'description', e.target.value)}
                                className="h-24"
                                placeholder="Description"
                            />
                        </div>
                    </div>

                            {/* Accomplishments */}
                            <div className="space-y-2">
                                <label className="font-medium">Accomplishments:</label>
                                {work.accomplishments.map((accomplishment, accIndex) => (
                                    <div key={accIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={accomplishment}
                                            // onChange={(e) => handleAccomplishmentChange(workIndex, accIndex, e.target.value)}
                                            className="flex-grow p-2 border rounded"
                                            placeholder="Accomplishment"
                                        />
                                        <Button 
                                            variant="destructive" 
                                            size="icon"
                                            // onClick={() => handleRemoveAccomplishment(workIndex, accIndex)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    // onClick={() => handleAddAccomplishment(workIndex)}
                                >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Add Accomplishment
                                </Button>
                            </div>
                            
                        </div>
                    ))}
                    <Button>
                        <PlusCircle className="w-4 h-4"/>
                    </Button>
                </div>
        

    );
}