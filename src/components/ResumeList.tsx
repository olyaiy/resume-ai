'use client'

import { Resume, Skill, Education, WorkExperience, Project } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Briefcase, GraduationCap, Code } from "lucide-react";
import { useState } from "react";
import { DeleteResumeDialog } from "@/components/DeleteResumeDialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Link as LinkIcon, User, FileCode } from "lucide-react";

interface ResumeListProps {
    resumeList: Resume[];
}

function truncate(str: string, n: number) {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}

function ResumePreview({ resume }: { resume: Resume }) {
    return (
        <Card className="w-full h-full hover:bg-secondary/50 transition-colors overflow-hidden">
            <div className="aspect-[3/4] flex flex-col">
                <CardHeader className="p-2 flex-shrink-0">
                    <h3 className="text-xs font-semibold truncate">{resume.name}</h3>
                    <p className="text-[10px] text-muted-foreground truncate">{resume.resume_name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {resume.email && (
                            <div className="flex items-center text-[10px] text-muted-foreground">
                                <Mail className="h-2 w-2 mr-1" />
                                <span className="truncate">{truncate(resume.email, 15)}</span>
                            </div>
                        )}
                        {resume.linkedin && (
                            <div className="flex items-center text-[10px] text-muted-foreground">
                                <LinkIcon className="h-2 w-2 mr-1" />
                                <span>LinkedIn</span>
                            </div>
                        )}
                        {resume.github && (
                            <div className="flex items-center text-[10px] text-muted-foreground">
                                <LinkIcon className="h-2 w-2 mr-1" />
                                <span>GitHub</span>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-2 pt-0 flex-grow overflow-auto">
                    <div className="space-y-2 text-[10px]">
                        <PreviewSection icon={<Code className="h-2 w-2" />} title="Skills">
                            <div className="flex flex-wrap gap-1">
                                {resume.skills.slice(0, 3).map((skill: Skill, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-[8px] px-1 py-0">
                                        {truncate(Object.values(skill)[0], 8)}
                                    </Badge>
                                ))}
                                {resume.skills.length > 3 && <Badge variant="outline" className="text-[8px] px-1 py-0">+{resume.skills.length - 3}</Badge>}
                            </div>
                        </PreviewSection>
                        
                        <PreviewSection icon={<Briefcase className="h-2 w-2" />} title="Work Experience">
                            {resume.work_history.slice(0, 1).map((work: WorkExperience, index: number) => (
                                <div key={index} className="text-[10px]">
                                    <p className="truncate font-medium">{work.company}</p>
                                    <p className="truncate">{work.position}</p>
                                    <p className="text-muted-foreground">{work.date}</p>
                                </div>
                            ))}
                        </PreviewSection>
                        
                        <PreviewSection icon={<FileCode className="h-2 w-2" />} title="Projects">
                            {resume.projects.slice(0, 1).map((project: Project, index: number) => (
                                <div key={index} className="text-[10px]">
                                    <p className="truncate font-medium">{project.name}</p>
                                    <p className="truncate">{truncate(project.description, 30)}</p>
                                </div>
                            ))}
                        </PreviewSection>
                        
                        <PreviewSection icon={<GraduationCap className="h-2 w-2" />} title="Education">
                            {resume.education_history.slice(0, 1).map((edu: Education, index: number) => (
                                <div key={index} className="text-[10px]">
                                    <p className="truncate font-medium">{edu.institution}</p>
                                    <p className="truncate">{edu.degree}</p>
                                    <p className="text-muted-foreground">{edu.date}</p>
                                </div>
                            ))}
                        </PreviewSection>

                        {resume.job_info && (
                            <PreviewSection icon={<User className="h-2 w-2" />} title="Job Info">
                                <p className="truncate">{truncate(resume.job_info, 40)}</p>
                            </PreviewSection>
                        )}
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

function PreviewSection({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center space-x-1 mb-1">
                {icon}
                <h4 className="font-medium text-[10px]">{title}</h4>
            </div>
            <div>{children}</div>
        </div>
    );
}

export function ResumeList({ resumeList }: ResumeListProps) {
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {resumeList.map((resume: Resume) => (
                    <div key={resume.id} className="relative">
                        <Link href={`/editor/${resume.id}`} className="block">
                            <p className="text-xs font-medium mb-1 truncate">{resume.resume_name}</p>
                            <div className="aspect-[3/4] relative">
                                <ResumePreview resume={resume} />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-1 right-1 h-4 w-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setResumeToDelete(resume.id);
                                    }}
                                >
                                    <Trash2 className="h-2 w-2" />
                                </Button>
                            </div>
                        </Link>
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