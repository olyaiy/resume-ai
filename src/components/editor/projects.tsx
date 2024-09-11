import { Resume } from "@/lib/types";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function Projects({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            {resume.projects.map((project, index) => (
                <div key={index} className="space-y-4 border p-4 rounded bg-card">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Project {index + 1}</h3>
                        <Button variant="destructive" size="icon">
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
                                // onChange={(e) => handleArrayChange<Project>('projects', index, 'name', e.target.value)}
                                placeholder="Project Name"
                            />
                        </div>
                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor={`project-description-${index}`}>Description</Label>
                            <Textarea
                                id={`project-description-${index}`}
                                value={project.description}
                                // onChange={(e) => handleArrayChange<Project>('projects', index, 'description', e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                        {/* Technologies */}
                        <div className="space-y-2">
                            <Label htmlFor={`project-technologies-${index}`}>Technologies</Label>
                            <Textarea
                                id={`project-technologies-${index}`}
                                value={project.technologies.join(', ')}
                                // onChange={(e) => handleArrayChange<Project>('projects', index, 'technologies', e.target.value.split(', '))}
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
                                // onChange={(e) => handleArrayChange<Project>('projects', index, 'url', e.target.value)}
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
                                        // onChange={(e) => handleAccomplishmentChange(index, accIndex, e.target.value)}
                                        className="flex-grow"
                                        placeholder="Accomplishment"
                                    />
                                    <Button 
                                        variant="destructive" 
                                        size="icon"
                                        // onClick={() => handleRemoveAccomplishment(index, accIndex)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button 
                                variant="outline" 
                                size="sm"
                                // onClick={() => handleAddAccomplishment(index)}
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Accomplishment
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
            <Button>
                <PlusCircle className="w-4 h-4 mr-2"/>
                Add Project
            </Button>
        </div>
    );
}