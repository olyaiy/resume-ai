'use client'

import { Button } from "@/components/ui/button";
import { Resume, Education, Project, Skill, SkillCategories } from "@/lib/types";
import { useState } from "react";
import ResumeDocument from "./document";
import { saveResume } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";
import BasicInfo from "@/components/editor/basic-info";
import Skills from "@/components/editor/skills";
import EducationHistory from "@/components/editor/education";
import Work from "@/components/editor/work";
import Projects from "@/components/editor/projects";




export default function EditorLayout({resumeData}: {resumeData: Resume}) {
    const { toast } = useToast()
    const [resume, setResume] = useState(resumeData);
    const [isSaving, setIsSaving] = useState(false);

    // const handleArrayChange = <T extends Education | WorkExperience | Project | Skill>(
    //     field: keyof Pick<Resume, 'education_history' | 'work_history' | 'projects' | 'skills'>,
    //     index: number,
    //     subField: keyof T,
    //     value: any
    // ) => {
    //     setResume(prev => ({
    //         ...prev,
    //         [field]: (prev[field] as T[]).map((item, i) => 
    //             i === index ? { ...item, [subField]: value } : item
    //         )
    //     }));
    // };

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
                <Work resume={resume} setResume={setResume}/>
                

                {/* Projects */}
                <Projects resume={resume} setResume={setResume}/>
                
                
            </div>
            {/* right side: resume display */}
            <ResumeDocument
                resumeData={resume}
            />
        </div>

    );
}