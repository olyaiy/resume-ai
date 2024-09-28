'use client'

import { Resume, Skill, Education, WorkExperience } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Briefcase, GraduationCap, Code } from "lucide-react";
import { useState } from "react";
import { DeleteResumeDialog } from "@/components/DeleteResumeDialog";
import { Badge } from "@/components/ui/badge";

interface ResumeListProps {
    resumeList: Resume[];
}

function ResumePreview({ resume }: { resume: Resume }) {
    return (
        <Card className="w-full h-full hover:bg-gray-50 transition-colors">
            <CardHeader className="p-4">
                <h3 className="text-base font-semibold truncate">{resume.resume_name}</h3>
                <p className="text-xs text-gray-500 truncate">{resume.name}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                    <PreviewSection icon={<Code className="h-3 w-3" />} title="Skills">
                        <div className="flex flex-wrap gap-1">
                            {resume.skills.slice(0, 3).map((skill: Skill, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {Object.values(skill)[0]}
                                </Badge>
                            ))}
                            {resume.skills.length > 3 && <Badge variant="outline" className="text-xs">+{resume.skills.length - 3}</Badge>}
                        </div>
                    </PreviewSection>
                    
                    <PreviewSection icon={<GraduationCap className="h-3 w-3" />} title="Education">
                        {resume.education_history.slice(0, 1).map((edu: Education, index: number) => (
                            <div key={index} className="text-xs">
                                <p className="truncate">{edu.institution} - {edu.degree}</p>
                            </div>
                        ))}
                    </PreviewSection>
                    
                    <PreviewSection icon={<Briefcase className="h-3 w-3" />} title="Work">
                        {resume.work_history.slice(0, 1).map((work: WorkExperience, index: number) => (
                            <div key={index} className="text-xs">
                                <p className="truncate">{work.company} - {work.position}</p>
                            </div>
                        ))}
                    </PreviewSection>
                </div>
            </CardContent>
        </Card>
    );
}

function PreviewSection({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center space-x-1 mb-1">
                {icon}
                <h4 className="font-medium text-xs">{title}</h4>
            </div>
            <div>{children}</div>
        </div>
    );
}

export function ResumeList({ resumeList }: ResumeListProps) {
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeList.map((resume: Resume) => (
                    <div key={resume.id} className="relative">
                        <Link href={`/editor/${resume.id}`} className="block h-full">
                            <ResumePreview resume={resume} />
                        </Link>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setResumeToDelete(resume.id);
                            }}
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>
            <DeleteResumeDialog
                resumeId={resumeToDelete || ''}
                isOpen={!!resumeToDelete}
                onOpenChange={(open) => {
                    if (!open) setResumeToDelete(null);
                }}
            />
        </div>
    );
}