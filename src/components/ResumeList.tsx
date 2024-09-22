'use client'

import { Resume } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteResumeDialog } from "@/components/DeleteResumeDialog";

interface ResumeListProps {
    resumeList: Resume[];
}

export const ResumeList = ({ resumeList }: ResumeListProps) => {
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

    return (
        <div className="w-full max-w-2xl">
            {resumeList.map((resume: Resume) => (
                <div key={resume.id} className="mb-2">
                    <Card className="relative w-full hover:bg-gray-50 hover:text-black transition-colors">
                        <Link href={`/editor/${resume.id}`} className=" p-4 flex items-center justify-between w-full h-full">
                            {/* Resume Name */}
                            <div className="text-lg font-medium truncate flex-grow">
                                {resume.resume_name}
                            </div>

                            {/* Delete Button */}
                            <Button
                                variant="destructive"
                                size="icon"
                                className="ml-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setResumeToDelete(resume.id);
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Card>
                </div>
            ))}
            <DeleteResumeDialog
                resumeId={resumeToDelete || ''}
                isOpen={!!resumeToDelete}
                onOpenChange={(open) => {
                    if (!open) setResumeToDelete(null);
                }}
            />
        </div>
    );
};