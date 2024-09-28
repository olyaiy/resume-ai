'use client'

import { Button } from "@/components/ui/button";
import { Resume } from "@/lib/types";
import { useState } from "react";
import { saveResume } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import BasicInfo from "@/components/editor/basic-info";
import Skills from "@/components/editor/skills";
import EducationHistory from "@/components/editor/education";
import Work from "@/components/editor/work";
import Projects from "@/components/editor/projects";
import { ClearResumeButton } from "@/components/editor/clear-resume";
import ResumeDocument from "./document";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { GripVertical } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function EditorLayout({ resumeData }: { resumeData?: Resume }) {
    const { toast } = useToast()
    const [resume, setResume] = useState(resumeData);
    const [isJobInfoDialogOpen, setIsJobInfoDialogOpen] = useState(false);

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

    const handleJobInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResume(prevResume => {
            if (!prevResume) return prevResume;
            return {
                ...prevResume,
                job_info: event.target.value
            };
        });
    };

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="h-full rounded-lg border"
        >
            <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full p-4 overflow-y-auto flex flex-col">
                    <div className="flex flex-row gap-2 mb-6">
                        <h1 className="text-2xl font-bold">Edit Resume</h1>
                        <Button 
                        onClick={() => handleSaveResume()}
                        className="ml-auto">
                            Save
                        </Button>
                        <ClearResumeButton resume={resume} setResume={setResume} />
                    </div>

                    <Accordion type="multiple" className="w-full mb-6">
                        <AccordionItem value="basic-info">
                            <AccordionTrigger>Basic Information</AccordionTrigger>
                            <AccordionContent>
                                <BasicInfo resume={resume} setResume={setResume}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="skills">
                            <AccordionTrigger>Skills</AccordionTrigger>
                            <AccordionContent>
                                <Skills resume={resume} setResume={setResume}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="work">
                            <AccordionTrigger>Work Experience</AccordionTrigger>
                            <AccordionContent>
                                <Work resume={resume} setResume={setResume}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="projects">
                            <AccordionTrigger>Projects</AccordionTrigger>
                            <AccordionContent>
                                <Projects resume={resume} setResume={setResume}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="education">
                            <AccordionTrigger>Education</AccordionTrigger>
                            <AccordionContent>
                                <EducationHistory resume={resume} setResume={setResume}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="mt-auto">
                        <Dialog open={isJobInfoDialogOpen} onOpenChange={setIsJobInfoDialogOpen}>
                            <DialogTrigger asChild>
                                <div className="cursor-text">
                                    <Label htmlFor="jobDescription" className="text-lg font-semibold">
                                        Job Info
                                    </Label>
                                    <div 
                                        className="mt-2 p-2 border rounded-md h-20 overflow-y-auto"
                                        style={{ cursor: 'text' }}
                                        role="textbox"
                                        tabIndex={0}
                                    >
                                        {resume.job_info || 'Click to edit job description...'}
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Edit Job Information</DialogTitle>
                                </DialogHeader>
                                <Textarea
                                    id="jobDescription"
                                    placeholder="Paste job description or listing here..."
                                    className="mt-2"
                                    rows={15}
                                    value={resume.job_info || ''}
                                    onChange={handleJobInfoChange}
                                />
                            </DialogContent>
                        </Dialog>
                        <div className="flex justify-end mt-2">
                            <Button>
                                Customize Resume
                            </Button>
                        </div>
                    </div>
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle>
                <div className="h-full w-2 bg-gray-200 cursor-col-resize flex items-center justify-center">
                    <GripVertical className="h-4 w-4 text-gray-500" />
                </div>
            </ResizableHandle>

            <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full">
                    <ResumeDocument resumeData={resume} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
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