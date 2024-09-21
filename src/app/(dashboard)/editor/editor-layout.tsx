'use client'

import { Button } from "@/components/ui/button";
import { Resume } from "@/lib/types";
import { Suspense, useState } from "react";
import ResumeDocument from "./document";
import { saveResume } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import BasicInfo from "@/components/editor/basic-info";
import Skills from "@/components/editor/skills";
import EducationHistory from "@/components/editor/education";
import Work from "@/components/editor/work";
import Projects from "@/components/editor/projects";





export default function EditorLayout({ resumeData }: { resumeData?: Resume }) {
    const { toast } = useToast()
    const [resume, setResume] = useState(resumeData);

    if (!resume) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Error loading resume</h2>
                    <p>Please refresh the page and try again.</p>
                    <p>If the issue persists, contact support.</p>
                </div>
            </div>
        );
    }


    const handleSaveResume = async () => {

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
        } 
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
                
                {/* Skills */}
                <Skills resume={resume} setResume={setResume}/>


                {/* Work Experience */}
                <Work resume={resume} setResume={setResume}/>
                

                {/* Projects */}
                <Projects resume={resume} setResume={setResume}/>

                {/* Education History */}
                <EducationHistory resume={resume} setResume={setResume}/>
                
                
            </div>
            {/* right side: resume display */}

                <ResumeDocument
                    resumeData={resume}
                />

        </div>

    );
}

// export function ResumeSkeleton() {
//     return (
//         <div className="w-full h-full p-4 space-y-4 bg-white rounded">
//             <Skeleton className="h-24 w-3/4 bg-slate-500" />
//             <Skeleton className="h-4 w-full bg-slate-500" />
//             <Skeleton className="h-4 w-full bg-slate-500" />
//             <Skeleton className="h-4 w-2/3 bg-slate-500" />
//             <div className="space-y-2">
//                 <Skeleton className="h-4 w-1/2 bg-slate-500" />
//                 <Skeleton className="h-4 w-full bg-slate-500" />
//                 <Skeleton className="h-4 w-full bg-slate-500" />
//             </div>
//             <div className="space-y-2">
//                 <Skeleton className="h-4 w-1/2 bg-slate-500" />
//                 <Skeleton className="h-4 w-full bg-slate-500" />
//                 <Skeleton className="h-4 w-full bg-slate-500" />
//             </div>
//             <div className="space-y-2">
//                 <Skeleton className="h-4 w-1/2 bg-slate-500" />
//                 <Skeleton className="h-4 w-full bg-slate-500" />
//                 <Skeleton className="h-4 w-full bg-slate-500" />
//             </div>
//             {/* Add more skeleton elements as needed to match your resume layout */}
//         </div>
//     );
// }