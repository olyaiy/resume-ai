import { UserProfile, WorkExperience } from '@/lib/types'
import { PlusCircle, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'


const ProfileWork = ({profile, setProfile}: {profile:UserProfile, setProfile: any}) => {
    const handleWorkChange = (index: number, field: keyof WorkExperience, value: string) => {
        const updatedWork = [...profile.work_history];
        updatedWork[index] = { ...updatedWork[index], [field]: value };
        setProfile({ ...profile, work_history: updatedWork });
    };

    const removeWorkExperience = (index: number) => {
        const updatedWork = profile.work_history.filter((_, i) => i !== index);
        setProfile({ ...profile, work_history: updatedWork });
    };

    const addWorkExperience = () => {
        const newWork: WorkExperience = {
            company: "",
            position: "",
            date: "",
            description: "",
            accomplishments: []
        };
        setProfile({ ...profile, work_history: [...profile.work_history, newWork] });
    };

    const handleAccomplishmentChange = (workIndex: number, accIndex: number, value: string) => {
        const updatedWork = [...profile.work_history];
        updatedWork[workIndex].accomplishments[accIndex] = value;
        setProfile({ ...profile, work_history: updatedWork });
    };

    const handleAddAccomplishment = (workIndex: number) => {
        const updatedWork = [...profile.work_history];
        updatedWork[workIndex].accomplishments.push("");
        setProfile({ ...profile, work_history: updatedWork });
    };

    const handleRemoveAccomplishment = (workIndex: number, accIndex: number) => {
        const updatedWork = [...profile.work_history];
        updatedWork[workIndex].accomplishments = updatedWork[workIndex].accomplishments.filter((_, i) => i !== accIndex);
        setProfile({ ...profile, work_history: updatedWork });
    };


  return (
    <div className='flex flex-col gap-4'>
        {profile.work_history.map((work, index) => (
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
                            variant="secondary" 
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
      
    </div>
  )
}

export default ProfileWork
