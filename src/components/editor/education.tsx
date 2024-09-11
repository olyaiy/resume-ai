import { Resume, Education } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

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
            <h2 className="text-xl font-semibold">Education History</h2>
            {resume.education_history.map((edu, index) => (
                <div key={index} className="space-y-4 border p-4 rounded bg-card">
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
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <Label>Institution:</Label>
                            <Input
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                placeholder="Institution"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <Label>Degree:</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                placeholder="Degree"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-center">
                            <Label>Dates:</Label>
                            <Input
                                type="text"
                                value={edu.date}
                                onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                                placeholder="E.g. Aug 2020 - May 2024"
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-start">
                            <Label>Description:</Label>
                            <Textarea
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
        </div>
    );
}