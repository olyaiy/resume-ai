'use client'

import { Button } from "@/components/ui/button";
import { Resume, Education, WorkExperience, Project, Skill, SkillCategories } from "@/lib/types";
import { useState } from "react";
import ResumeDocument from "./document";
import { saveResume } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";
import BasicInfo from "@/components/editor/basic-info";
import Skills from "@/components/editor/skills";
import EducationHistory from "@/components/editor/education";



export default function EditorLayout({resumeData}: {resumeData: Resume}) {
    const { toast } = useToast()
    const [resume, setResume] = useState(resumeData);
    const [isSaving, setIsSaving] = useState(false);

    const handleArrayChange = <T extends Education | WorkExperience | Project | Skill>(
        field: keyof Pick<Resume, 'education_history' | 'work_history' | 'projects' | 'skills'>,
        index: number,
        subField: keyof T,
        value: any
    ) => {
        setResume(prev => ({
            ...prev,
            [field]: (prev[field] as T[]).map((item, i) => 
                i === index ? { ...item, [subField]: value } : item
            )
        }));
    };

    const handleSaveResume = async () => {
        setIsSaving(true);
        toast({
            title: "Saving resume...",
            description: "Please wait while we save your changes.",
        });

        try {
            const result = await saveResume(resume);
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
            setIsSaving(false);
        }
    };

    const handleSkillChange = (index: number, field: 'category' | 'skills', value: string) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) => 
                i === index ? { ...skill, [field]: value } : skill
            )
        }));
    };

    const addSkillCategory = () => {
        setResume(prev => ({
            ...prev,
            skills: [...prev.skills, { category: '', skills: '' }]
        }));
    };

    const removeSkillCategory = (index: number) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };



    return (
        <div className="flex flex-row gap-4 h-full ">
            {/* left side: resume editor */}
            <div className="w-full h-full space-y-6 p-4 overflow-scroll">


                
                <div className="flex flex-row">
                    <h1 className="text-2xl font-bold">Edit Resume</h1>
                    <Button 
                    onClick={() => handleSaveResume()}
                    className="ml-auto">
                        Save
                    </Button>
                </div>

                {/* Basic Information */}
                <BasicInfo resume={resume} setResume={setResume}/>
                {/* <div className="space-y-2 bg-card p-4 border rounded">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                    <div className="flex items-center space-x-2">
                        <label className="w-24">Name:</label>
                        <input
                            type="text"
                            value={resume.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="flex-grow p-2 border rounded"
                            placeholder="Name"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="w-24">Resume Name:</label>
                        <input
                            type="text"
                            value={resume.resume_name}
                            onChange={(e) => handleInputChange('resume_name', e.target.value)}
                            className="flex-grow p-2 border rounded"
                            placeholder="Resume Name"
                        />
                    </div>
                </div> */}

                {/* Skills */}
                <Skills resume={resume} setResume={setResume}/>

                {/* Education History */}
                <EducationHistory resume={resume} setResume={setResume}/>


                {/* Work Experience */}
                {/* <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    {resume.work_history.map((work, index) => (
                        <div key={index} className="space-y-2 border p-4 rounded bg-card">
                            <div className="w-full flex justify-end">
                                <Button variant={'destructive'} className=" top-4 right-4">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Company:</label>
                                <textarea
                                    value={work.company}
                                    onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'company', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Company"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Position:</label>
                                <textarea
                                    value={work.position}
                                    onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'position', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Position"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Start Date:</label>
                                <input
                                    type="text"
                                    value={work.startDate}
                                    onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'startDate', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">End Date:</label>
                                <input
                                    type="text"
                                    value={work.endDate}
                                    onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'endDate', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="End Date"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Description:</label>
                                <textarea
                                    value={work.description}
                                    onChange={(e) => handleArrayChange<WorkExperience>('work_history', index, 'description', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                    ))}
                </div> */}

                {/* Projects */}
                {/* <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    {resume.projects.map((project, index) => (
                        <div key={index} className="space-y-2 border p-4 rounded bg-card">
                            <div className="w-full flex justify-end">
                                <Button variant={'destructive'} className=" top-4 right-4">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Name:</label>
                                <textarea
                                    value={project.name}
                                    onChange={(e) => handleArrayChange<Project>('projects', index, 'name', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Project Name"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Description:</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => handleArrayChange<Project>('projects', index, 'description', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Description"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Technologies:</label>
                                <textarea
                                    value={project.technologies.join(', ')}
                                    onChange={(e) => handleArrayChange<Project>('projects', index, 'technologies', e.target.value.split(', '))}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Technologies (comma-separated)"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">URL:</label>
                                <input
                                    type="text"
                                    value={project.url || ''}
                                    onChange={(e) => handleArrayChange<Project>('projects', index, 'url', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="URL (optional)"
                                />
                            </div>
                        </div>
                    ))}
                </div> */}
                
            </div>
            {/* right side: resume display */}
            <ResumeDocument
                resumeData={resume}
            />
        </div>

    );
}