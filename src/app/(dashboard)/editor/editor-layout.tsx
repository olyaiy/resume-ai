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
        <div className="w-full h-full flex">
            {/* Left side: Form fields */}
            <div className="w-1/2 h-full overflow-y-auto p-4 space-y-6">
                <div className="flex flex-row items-center mb-4">
                    <h1 className="text-2xl font-bold">Edit Resume</h1>
                    <Button className="ml-auto">Save</Button>
                </div>

                {/* Basic Information */}
                <div className="space-y-2 bg-card p-4 border rounded">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                    {/* ... Basic Information fields ... */}
                </div>

                            {/* Skills */}
                            <div className="space-y-2 bg-card p-4 border rounded">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    {/* ... Skills fields ... */}
                </div>

                {/* Education History */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Education History</h2>
                    {/* ... Education History fields ... */}
                </div>

                {/* Work Experience */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    {/* ... Work Experience fields ... */}
                </div>

                {/* Projects */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    {/* ... Projects fields ... */}
                </div>
            </div>

            {/* Right side: Resume Document */}
            <div className="w-1/2 h-full overflow-y-auto border-l">
                <ResumeDocument/>
            </div>
        </div>
    );
}