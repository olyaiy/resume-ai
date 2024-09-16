'use client';

import { useState } from 'react';
import { UserProfile, Skill, WorkExperience, Project, Education } from '@/lib/types';
import { updateProfile } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, Trash2 } from "lucide-react";

interface ProfileEditorProps {
  initialProfile: UserProfile;
}

export function ProfileEditor({ initialProfile }: ProfileEditorProps) {
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
  
    const handleSaveProfile = async () => {
      setIsLoading(true);
      toast({
        title: "Saving profile...",
        description: "Please wait while we save your changes.",
      });
  
      try {
        const result = await updateProfile(profile);
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while saving",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    // BasicInfo component
    const BasicInfo = () => {
      return (
        <div className="space-y-2 bg-card p-4 border rounded">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <div className="flex items-center space-x-2">
            <label className="w-24">Username:</label>
            <Input
              type="text"
              value={profile.username || ''}
              onChange={(e) => setProfile({...profile, username: e.target.value})}
              className="flex-grow p-2 border rounded"
              placeholder="Username"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-24">First Name:</label>
            <Input
              type="text"
              value={profile.first_name || ''}
              onChange={(e) => setProfile({...profile, first_name: e.target.value})}
              className="flex-grow p-2 border rounded"
              placeholder="First Name"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-24">Last Name:</label>
            <Input
              type="text"
              value={profile.last_name || ''}
              onChange={(e) => setProfile({...profile, last_name: e.target.value})}
              className="flex-grow p-2 border rounded"
              placeholder="Last Name"
            />
          </div>
        </div>
      );
    };

  // Skills component
  const Skills = () => {
    const handleSkillChange = (index: number, field: 'category' | 'skills', value: string) => {
      const updatedSkills = [...(profile.skills || [])];
      if (field === 'category') {
        const oldCategory = Object.keys(updatedSkills[index])[0];
        updatedSkills[index] = { [value]: updatedSkills[index][oldCategory] };
      } else {
        const category = Object.keys(updatedSkills[index])[0];
        updatedSkills[index] = { [category]: value };
      }
      setProfile({ ...profile, skills: updatedSkills });
    };

    const removeSkillCategory = (index: number) => {
      const updatedSkills = (profile.skills || []).filter((_, i) => i !== index);
      setProfile({ ...profile, skills: updatedSkills });
    };

    const addSkillCategory = () => {
      const newSkill: Skill = { "New Category": "" };
      setProfile({ ...profile, skills: [...(profile.skills || []), newSkill] });
    };

    return (
      <Accordion type="single" collapsible className="w-full" defaultValue="skills">
        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {(profile.skills || []).map((skill, index) => {
                const category = Object.keys(skill)[0];
                const skillsList = skill[category];

                return (
                  <div key={index} className="flex items-center flex-col w-full gap-2 pb-4 bg-card p-4 border rounded">
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
                );
              })}

              <Button 
                onClick={addSkillCategory} 
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Skill Category
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

   // Work component
   const Work = () => {
    const handleWorkChange = (index: number, field: keyof WorkExperience, value: string) => {
      const updatedWork = [...(profile.work_history || [])];
      updatedWork[index] = { ...updatedWork[index], [field]: value };
      setProfile({ ...profile, work_history: updatedWork });
    };

    const removeWorkExperience = (index: number) => {
      const updatedWork = (profile.work_history || []).filter((_, i) => i !== index);
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
      setProfile({ ...profile, work_history: [...(profile.work_history || []), newWork] });
    };

    const handleAccomplishmentChange = (workIndex: number, accIndex: number, value: string) => {
      const updatedWork = [...(profile.work_history || [])];
      if (!updatedWork[workIndex].accomplishments) {
        updatedWork[workIndex].accomplishments = [];
      }
      updatedWork[workIndex].accomplishments[accIndex] = value;
      setProfile({ ...profile, work_history: updatedWork });
    };

    const handleAddAccomplishment = (workIndex: number) => {
      const updatedWork = [...(profile.work_history || [])];
      if (!updatedWork[workIndex].accomplishments) {
        updatedWork[workIndex].accomplishments = [];
      }
      updatedWork[workIndex].accomplishments.push("");
      setProfile({ ...profile, work_history: updatedWork });
    };

    const handleRemoveAccomplishment = (workIndex: number, accIndex: number) => {
      const updatedWork = [...(profile.work_history || [])];
      if (updatedWork[workIndex].accomplishments) {
        updatedWork[workIndex].accomplishments = updatedWork[workIndex].accomplishments.filter((_, i) => i !== accIndex);
        setProfile({ ...profile, work_history: updatedWork });
      }
    };

    return (
        <Accordion type="single" collapsible className="w-full" defaultValue="work">
            <AccordionItem value="work">
            <AccordionTrigger>Work Experience</AccordionTrigger>
            <AccordionContent>
                {(profile.work_history || []).map((work, index) => (
                <div key={index} className="space-y-4 border p-4 rounded bg-card mb-4">
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
                    variant="outline" 
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  // Projects component
  const Projects = () => {
    const handleProjectChange = <T extends keyof Project>(
      index: number,
      field: T,
      value: Project[T]
    ) => {
      const updatedProjects = [...(profile.projects || [])];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      setProfile({ ...profile, projects: updatedProjects });
    };

    const handleAddAccomplishment = (index: number) => {
      const updatedProjects = [...(profile.projects || [])];
      if (!updatedProjects[index].accomplishments) {
        updatedProjects[index].accomplishments = [];
      }
      updatedProjects[index].accomplishments.push("");
      setProfile({ ...profile, projects: updatedProjects });
    };

    const handleRemoveAccomplishment = (projectIndex: number, accIndex: number) => {
      const updatedProjects = [...(profile.projects || [])];
      if (updatedProjects[projectIndex].accomplishments) {
        updatedProjects[projectIndex].accomplishments.splice(accIndex, 1);
        setProfile({ ...profile, projects: updatedProjects });
      }
    };

    const handleAddProject = () => {
      const newProject: Project = {
        name: "",
        description: "",
        accomplishments: [],
        technologies: [],
      };
      setProfile({ ...profile, projects: [...(profile.projects || []), newProject] });
    };

    const handleRemoveProject = (index: number) => {
      const updatedProjects = (profile.projects || []).filter((_, i) => i !== index);
      setProfile({ ...profile, projects: updatedProjects });
    };

    return (
      <Accordion type="single" collapsible className="w-full" defaultValue="projects">
        <AccordionItem value="projects">
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent>
            {(profile.projects || []).map((project, index) => (
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
                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${index}`}>Name</Label>
                    <Input
                      id={`project-name-${index}`}
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                      placeholder="Project Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`project-description-${index}`}>Description</Label>
                    <Textarea
                      id={`project-description-${index}`}
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`project-technologies-${index}`}>Technologies</Label>
                    <Textarea
                      id={`project-technologies-${index}`}
                      value={project.technologies.join(', ')}
                      onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(', '))}
                      placeholder="Technologies (comma-separated)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`project-url-${index}`}/>

                    <Input
                      id={`project-url-${index}`}
                      type="text"
                      value={project.url || ''}
                      onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                      placeholder="URL (optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">Accomplishments</Label>
                    {project.accomplishments.map((accomplishment, accIndex) => (
                      <div key={accIndex} className="flex items-center space-x-2">
                        <Input
                          value={accomplishment}
                          onChange={(e) => {
                            const updatedAccomplishments = [...project.accomplishments];
                            updatedAccomplishments[accIndex] = e.target.value;
                            handleProjectChange(index, 'accomplishments', updatedAccomplishments);
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
            <Button onClick={handleAddProject}>
              <PlusCircle className="w-4 h-4 mr-2"/>
              Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };


   // Education component
  const EducationHistory = () => {
    const handleEducationChange = (index: number, field: keyof Education, value: string) => {
      const updatedEducation = [...(profile.education_history || [])];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      setProfile({ ...profile, education_history: updatedEducation });
    };

    const removeEducation = (index: number) => {
      const updatedEducation = (profile.education_history || []).filter((_, i) => i !== index);
      setProfile({ ...profile, education_history: updatedEducation });
    };

    const addEducation = () => {
      const newEducation: Education = {
        institution: "",
        degree: "",
        date: "",
        description: ""
      };
      setProfile({ ...profile, education_history: [...(profile.education_history || []), newEducation] });
    };

    return (
      <Accordion type="single" collapsible className="w-full" defaultValue="education">
        <AccordionItem value="education">
          <AccordionTrigger>Education History</AccordionTrigger>
          <AccordionContent>
            {(profile.education_history || []).map((edu, index) => (
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
    );
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="w-full h-full space-y-6 p-4 overflow-scroll">
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <Button 
            onClick={handleSaveProfile}
            className="ml-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <BasicInfo />
        <Skills />
        <Work />
        <Projects />
        <EducationHistory />
      </div>
    </div>
  );
}