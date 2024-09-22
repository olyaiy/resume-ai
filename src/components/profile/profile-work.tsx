import { UserProfile } from '@/lib/types'
import { PlusCircle, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const ProfileWork = ({profile, setProfile}: {profile: UserProfile, setProfile: React.Dispatch<React.SetStateAction<UserProfile>>}) => {
    
    console.log(profile.work_history)
    
    const handleWorkChange = (index: number, value: string) => {
        const updatedWork = [...profile.work_history];
        updatedWork[index] = value;
        setProfile(prev => ({ ...prev, work_history: updatedWork }));
    };

    const removeWorkExperience = (index: number) => {
        setProfile(prev => ({
            ...prev,
            work_history: prev.work_history.filter((_, i) => i !== index)
        }));
    };

    const addWorkExperience = () => {
        setProfile(prev => ({
            ...prev,
            work_history: [...prev.work_history, ""]
        }));
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
                    
                    <Textarea
                        value={work}
                        onChange={(e) => handleWorkChange(index, e.target.value)}
                        className="h-40"
                        placeholder="Enter your work experience details here..."
                    />
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