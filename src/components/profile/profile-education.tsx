import React from 'react'
import { Button } from '../ui/button'
import { PlusCircleIcon, Trash2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Education, UserProfile } from '@/lib/types'

const ProfileEducation = ({profile, setProfile}: {profile:UserProfile, setProfile: any}) => {

    const handleEducationChange = (index: number, field: keyof Education, value: string) => {
        const updatedEducation = [...profile.education_history];
        updatedEducation[index] = { ...updatedEducation[index], [field]: value };
        setProfile({ ...profile, education_history: updatedEducation });
    };

    const removeEducation = (index: number) => {
        const updatedEducation = profile.education_history.filter((_, i) => i !== index);
        setProfile({ ...profile, education_history: updatedEducation });
    };

    const addEducation = () => {
        const newEducation: Education = {
            institution: "",
            degree: "",
            date: "",
            description: ""
        };
        setProfile({ ...profile, education_history: [...profile.education_history, newEducation] });
    };

    return (
        <div className="space-y-4">
            
                        {profile.education_history.map((edu, index) => (
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
                        <Button onClick={addEducation} className='w-full'>
                            <PlusCircleIcon className="w-4 h-4 mr-2"/>
                            Add Education
                        </Button>

        </div>
    );
}

export default ProfileEducation
