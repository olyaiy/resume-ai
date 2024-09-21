import { Skill, UserProfile } from '@/lib/types'
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

const ProfileSkills = ({profile, setProfile}: {profile:UserProfile, setProfile: any}) => {

    const handleSkillChange = (index: number, field: 'category' | 'skills', value: string) => {
        const updatedSkills = [...profile.skills];
        if (field === 'category') {
            const oldCategory = Object.keys(updatedSkills[index])[0];
            updatedSkills[index] = { [value]: updatedSkills[index][oldCategory] };
        } else {
            const category = Object.keys(updatedSkills[index])[0];
            updatedSkills[index] = { [category]: value };
        }
        setProfile({ ...profile, skills: updatedSkills });
    };

     // Handler for removing a skill
     const removeSkillCategory = (index: number) => {
        const updatedSkills = profile.skills.filter((_, i) => i !== index);
        setProfile({ ...profile, skills: updatedSkills });
    };

    // Handler for adding a skill
    const addSkillCategory = () => {
        const newSkill: Skill = { "New Category": "" };
        setProfile({ ...profile, skills: [...profile.skills, newSkill] });
    };


  return (
    <div>
     
     {profile.skills.map((skill, index) => {
                                const category = Object.keys(skill)[0];
                                const skillsList = skill[category];

                                return (
                                    <div key={index} className="flex items-center flex-col w-full gap-2 pb-4 bg-card p-4 border rounded mb-2">
                                        <div className="flex flex-row w-full gap-4 items-stretch justify-stretch">
                                            <Input
                                                type="text"
                                                value={category}
                                                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                                className="w-full"
                                                placeholder="Skill Category"
                                            />
                                            
                                            <Button
                                                variant="destructive" 
                                                size="icon"
                                                onClick={() => removeSkillCategory(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Textarea
                                            value={skillsList}
                                            onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
                                            className="w-full"
                                            placeholder="Skills (comma-separated)"
                                        />
                                    </div>
                                )
                        })}
            <Button 
                                onClick={addSkillCategory} 
                                className="w-full"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Skill Category
                            </Button>


    </div>
  )
}

export default ProfileSkills
