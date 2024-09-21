import { UserProfile } from '@/lib/types'
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Trash2 } from 'lucide-react';

const ProfileSkills = ({profile, setProfile}: {profile:UserProfile, setProfile: any}) => {
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
                                                // onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                                                className="w-full"
                                                placeholder="Skill Category"
                                            />
                                            
                                            <Button
                                                variant="destructive" 
                                                size="icon"
                                                // onClick={() => removeSkillCategory(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Textarea
                                            value={skillsList}
                                            // onChange={(e) => handleSkillChange(index, 'skills', e.target.value)}
                                            className="w-full"
                                            placeholder="Skills (comma-separated)"
                                        />
                                    </div>
                                )
        })}


    </div>
  )
}

export default ProfileSkills
