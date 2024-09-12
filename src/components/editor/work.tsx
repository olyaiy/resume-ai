import { Resume, WorkExperience } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Work({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    const handleWorkChange = (index: number, field: keyof WorkExperience, value: string) => {
        const updatedWork = [...resume.work_history];
        updatedWork[index] = { ...updatedWork[index], [field]: value };
        setResume({ ...resume, work_history: updatedWork });
    };

    const removeWorkExperience = (index: number) => {
        const updatedWork = resume.work_history.filter((_, i) => i !== index);
        setResume({ ...resume, work_history: updatedWork });
    };

    const addWorkExperience = () => {
        const newWork: WorkExperience = {
            company: "",
            position: "",
            date: "",
            description: "",
            accomplishments: []
        };
        setResume({ ...resume, work_history: [...resume.work_history, newWork] });
    };

    const handleAccomplishmentChange = (workIndex: number, accIndex: number, value: string) => {
        const updatedWork = [...resume.work_history];
        updatedWork[workIndex].accomplishments[accIndex] = value;
        setResume({ ...resume, work_history: updatedWork });
    };

    const handleAddAccomplishment = (workIndex: number) => {
        const updatedWork = [...resume.work_history];
        updatedWork[workIndex].accomplishments.push("");
        setResume({ ...resume, work_history: updatedWork });
    };

    const handleRemoveAccomplishment = (workIndex: number, accIndex: number) => {
        const updatedWork = [...resume.work_history];
        updatedWork[workIndex].accomplishments = updatedWork[workIndex].accomplishments.filter((_, i) => i !== accIndex);
        setResume({ ...resume, work_history: updatedWork });
    };

    return (
        <div className="space-y-4">

            <Accordion type="single" collapsible className="w-full" defaultValue="work">
            <AccordionItem value="work">
            <AccordionTrigger>Work Experience</AccordionTrigger>
            <AccordionContent>

            {resume.work_history.map((work, index) => (
                <div key={index} className="space-y-4 border p-4 rounded bg-card">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Work Experience {index + 1}</h3>
                        <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => removeWorkExperience(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    {/* Form fields */}
                    <div className="grid gap-4">
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <label>Company:</label>
                            <Input
                                value={work.company}
                                onChange={(e) => handleWorkChange(index, 'company', e.target.value)}
                                placeholder="Company"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <label>Position:</label>
                            <Input
                                value={work.position}
                                onChange={(e) => handleWorkChange(index, 'position', e.target.value)}
                                placeholder="Position"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <label>Date:</label>
                            <Input
                                type="text"
                                value={work.date}
                                onChange={(e) => handleWorkChange(index, 'date', e.target.value)}
                                placeholder="E.g. Aug 2024 - Dec 2025"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-start">
                            <label>Description:</label>
                            <Textarea
                                value={work.description}
                                onChange={(e) => handleWorkChange(index, 'description', e.target.value)}
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
                                    onChange={(e) => handleAccomplishmentChange(index, accIndex, e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Accomplishment"
                                />
                                <Button 
                                    variant="destructive" 
                                    size="icon"
                                    onClick={() => handleRemoveAccomplishment(index, accIndex)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddAccomplishment(index)}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Accomplishment
                        </Button>
                    </div>
                </div>
            ))}
            <Button onClick={addWorkExperience}>
                <PlusCircle className="w-4 h-4 mr-2"/>
                Add Work Experience
            </Button>
            </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}