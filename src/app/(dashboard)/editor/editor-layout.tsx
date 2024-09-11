'use client'

import { Button } from "@/components/ui/button";
import { Resume, Education, WorkExperience, Project, Skill } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ResumeDocument from "./document";

export default function EditorLayout({resumeData}: {resumeData: Resume}) {
    const [resume, setResume] = useState<Resume>(resumeData);

    const handleInputChange = (field: keyof Resume, value: any) => {
        setResume(prev => ({ ...prev, [field]: value }));
    };

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

    return (
        <div className="flex flex-row gap-4 h-full ">
            <div className="w-full h-full space-y-6 p-4 overflow-scroll">


                
                <div className="flex flex-row">
                    <h1 className="text-2xl font-bold">Edit Resume</h1>
                    <Button className="ml-auto">Save</Button>
                </div>

                {/* Basic Information */}
                <div className="space-y-2 bg-card p-4 border rounded">
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
                </div>

                {/* Skills */}
                <div className="space-y-2 bg-card p-4 border rounded">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    {resume.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <label className="w-24">Skill {index + 1}:</label>
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleArrayChange<Skill>('skills', index, 'name', e.target.value)}
                                className="flex-grow p-2 border rounded"
                                placeholder="Skill Name"
                            />
                            <Button variant={'destructive'}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Education History */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Education History</h2>
                    {resume.education_history.map((edu, index) => (
                        <div key={index} className="space-y-2 border p-4 rounded relative bg-card">
                            <div className="w-full flex justify-end">
                                <Button variant={'destructive'} className=" top-4 right-4">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Institution:</label>
                                <textarea
                                    value={edu.institution}
                                    onChange={(e) => handleArrayChange<Education>('education_history', index, 'institution', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Institution"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Degree:</label>
                                <textarea
                                    value={edu.degree}
                                    onChange={(e) => handleArrayChange<Education>('education_history', index, 'degree', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Degree"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Field of Study:</label>
                                <textarea
                                    value={edu.fieldOfStudy}
                                    onChange={(e) => handleArrayChange<Education>('education_history', index, 'fieldOfStudy', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Field of Study"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Start Date:</label>
                                <input
                                    type="text"
                                    value={edu.startDate}
                                    onChange={(e) => handleArrayChange<Education>('education_history', index, 'startDate', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">End Date:</label>
                                <input
                                    type="text"
                                    value={edu.endDate}
                                    onChange={(e) => handleArrayChange<Education>('education_history', index, 'endDate', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="End Date"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="w-24">Description:</label>
                                <textarea
                                    value={edu.description || ''}
                                    onChange={(e) => handleArrayChange<Education>('education_history', index, 'description', e.target.value)}
                                    className="flex-grow p-2 border rounded"
                                    placeholder="Description (optional)"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Work Experience */}
                <div className="space-y-2">
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
                </div>

                {/* Projects */}
                <div className="space-y-2">
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
                </div>
                
            </div>
            <ResumeDocument />
        </div>

    );
}