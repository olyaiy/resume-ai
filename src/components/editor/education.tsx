import { Resume, Education } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function EducationHistory({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    const handleEducationChange = (index: number, field: keyof Education, value: string) => {
        const updatedEducation = [...resume.education_history];
        updatedEducation[index] = { ...updatedEducation[index], [field]: value };
        setResume({ ...resume, education_history: updatedEducation });
    };

    const removeEducation = (index: number) => {
        const updatedEducation = resume.education_history.filter((_, i) => i !== index);
        setResume({ ...resume, education_history: updatedEducation });
    };

    const addEducation = () => {
        const newEducation: Education = {
            institution: "",
            degree: "",
            date: "",
            description: ""
        };
        setResume({ ...resume, education_history: [...resume.education_history, newEducation] });
    };

    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full" defaultValue="education">
                <AccordionItem value="education">
                    <AccordionTrigger>Education History</AccordionTrigger>
                    <AccordionContent>
                        {resume.education_history.map((edu, index) => (
                            <div key={index} className="space-y-4 border p-4 rounded bg-card mb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">Education {index + 1}</h3>
                                    <Button 
                                        variant="destructive" 
                                        size="icon"
                                        onClick={() => removeEducation(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                
                                {/* Form fields */}
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`education-institution-${index}`}>Institution</Label>
                                        <Input
                                            id={`education-institution-${index}`}
                                            value={edu.institution}
                                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                            placeholder="Institution"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`education-degree-${index}`}>Degree</Label>
                                        <Input
                                            id={`education-degree-${index}`}
                                            value={edu.degree}
                                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                            placeholder="Degree"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`education-date-${index}`}>Dates</Label>
                                        <Input
                                            id={`education-date-${index}`}
                                            type="text"
                                            value={edu.date}
                                            onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                                            placeholder="E.g. Aug 2020 - May 2024"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`education-description-${index}`}>Description</Label>
                                        <Textarea
                                            id={`education-description-${index}`}
                                            value={edu.description || ''}
                                            onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                                            placeholder="Description (optional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button onClick={addEducation}>
                            <PlusCircle className="w-4 h-4 mr-2"/>
                            Add Education
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}