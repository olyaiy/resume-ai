import { UserProfile } from '@/lib/types';
import React from 'react'
import { Button } from '../ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ProfileProjects = ({profile, setProfile}: {profile: UserProfile, setProfile: React.Dispatch<React.SetStateAction<UserProfile>>}) => {
    const handleProjectChange = (index: number, value: string) => {
        const updatedProjects = [...profile.projects];
        updatedProjects[index] = value;
        setProfile({ ...profile, projects: updatedProjects });
    };

    const handleAddProject = () => {
        setProfile({ ...profile, projects: [...profile.projects, ""] });
    };

    const handleRemoveProject = (index: number) => {
        const updatedProjects = profile.projects.filter((_, i) => i !== index);
        setProfile({ ...profile, projects: updatedProjects });
    };

    return (
        <div className="space-y-4">
            {profile.projects.map((project, index) => (
                <div key={index} className="space-y-4 border p-4 rounded bg-card mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Project {index + 1}</h3>
                        <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleRemoveProject(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor={`project-${index}`}>Project Details</Label>
                        <Textarea
                            id={`project-${index}`}
                            value={project}
                            onChange={(e) => handleProjectChange(index, e.target.value)}
                            placeholder="Project details"
                            className="h-64"
                        />
                    </div>
                </div>
            ))}
            <Button onClick={handleAddProject} className='w-full'>
                <PlusCircle className="w-4 h-4 mr-2"/>
                Add Project
            </Button>
        </div>
    );
}

export default ProfileProjects