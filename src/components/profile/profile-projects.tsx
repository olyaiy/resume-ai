import { Project, UserProfile } from '@/lib/types';
import React from 'react'
import { Button } from '../ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ProfileProjects = ({profile, setProfile}: {profile:UserProfile, setProfile: any}) => {
    const handleArrayChange = <T extends keyof Project>(
        index: number,
        field: T,
        value: Project[T]
    ) => {
        const updatedProjects = [...profile.projects];
        updatedProjects[index] = { ...updatedProjects[index], [field]: value };
        setProfile({ ...profile, projects: updatedProjects });
    };

    const handleAddAccomplishment = (index: number) => {
        const updatedProjects = [...profile.projects];
        updatedProjects[index].accomplishments.push("");
        setProfile({ ...profile, projects: updatedProjects });
    };

    const handleRemoveAccomplishment = (projectIndex: number, accIndex: number) => {
        const updatedProjects = [...profile.projects];
        updatedProjects[projectIndex].accomplishments.splice(accIndex, 1);
        setProfile({ ...profile, projects: updatedProjects });
    };

    const handleAddProject = () => {
        const newProject: Project = {
            name: "",
            description: "",
            accomplishments: [],
            technologies: [],
        };
        setProfile({ ...profile, projects: [...profile.projects, newProject] });
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
                    
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor={`project-name-${index}`}>Name</Label>
                            <Input
                                id={`project-name-${index}`}
                                value={project.name}
                                onChange={(e) => handleArrayChange(index, 'name', e.target.value)}
                                placeholder="Project Name"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor={`project-description-${index}`}>Description</Label>
                            <Textarea
                                id={`project-description-${index}`}
                                value={project.description}
                                onChange={(e) => handleArrayChange(index, 'description', e.target.value)}
                                placeholder="Description"
                            />
                        </div>

                        {/* Technologies */}
                        <div className="space-y-2">
                            <Label htmlFor={`project-technologies-${index}`}>Technologies</Label>
                            <Textarea
                                id={`project-technologies-${index}`}
                                value={project.technologies.join(', ')}
                                onChange={(e) => handleArrayChange(index, 'technologies', e.target.value.split(', '))}
                                placeholder="Technologies (comma-separated)"
                            />
                        </div>

                        {/* URL */}
                        <div className="space-y-2">
                            <Label htmlFor={`project-url-${index}`}>URL</Label>
                            <Input
                                id={`project-url-${index}`}
                                type="text"
                                value={project.url || ''}
                                onChange={(e) => handleArrayChange(index, 'url', e.target.value)}
                                placeholder="URL (optional)"
                            />
                        </div>

                        {/* Accomplishments */}
                        <div className="space-y-2">
                            <Label className="font-medium">Accomplishments</Label>
                            {project.accomplishments.map((accomplishment, accIndex) => (
                                <div key={accIndex} className="flex items-center space-x-2">
                                    <Input
                                        value={accomplishment}
                                        onChange={(e) => {
                                            const updatedAccomplishments = [...project.accomplishments];
                                            updatedAccomplishments[accIndex] = e.target.value;
                                            handleArrayChange(index, 'accomplishments', updatedAccomplishments);
                                        }}
                                        className="flex-grow"
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
