'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { FileText, Trash2 } from "lucide-react";
import { Resume } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { createResume, deleteResume } from "@/app/actions";

export default function Dashboard({resumeList}: {resumeList: Resume[]}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCreateResume = async () => {
        const resumeName = inputRef.current?.value.trim();
        if (!resumeName) {
            setError("Resume name is required");
            return;
        }
        setError(null);
        const result = await createResume(resumeName);
        if (result.success) {
            setIsOpen(false);
            router.push(`/editor/${result.id}`);
        } else {
            console.error(result.message);
            setError(result.message);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateResume();
        }
    }

    const handleDeleteResume = (resumeId: string) => {
        setResumeToDelete(resumeId);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (resumeToDelete) {
            startTransition(() => {
                deleteResume(resumeToDelete)
                    .then(() => {
                        setIsDeleteDialogOpen(false);
                        router.refresh();
                    })
                    .catch((error) => {
                        console.error('Error deleting resume:', error);
                        // Handle error (e.g., show an error message)
                    });
            });
        }
    };


    return (
        <div className="gap-2 flex flex-col items-start">
             <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* New Resume Button */}
                <DialogTrigger asChild>
                    <Button className="h-12">
                        <FileText className="mr-2 h-4 w-4" />
                        New Resume
                    </Button>
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Name Your Resume</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="resumeName">Resume Name</Label>
                            <Input
                                id="resumeName"
                                ref={inputRef}
                                placeholder="Enter resume name"
                                onKeyDown={handleKeyDown}
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                    </div>
                    <Button onClick={handleCreateResume}>Continue</Button>
                </DialogContent>
            </Dialog>
            


            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this resume? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={isPending}>
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="w-full max-w-2xl">
                {resumeList.map((resume: Resume) => (
                    <div key={resume.id} className="mb-2">
                        <Card className="relative w-full p-4 hover:bg-gray-50 hover:text-black transition-colors">
                            <Link href={`/editor/${resume.id}`} className="flex items-center justify-between w-full">
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
                                        handleDeleteResume(resume.id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </Link>
                        </Card>
                    </div>
                ))}
            </div>

        </div>
    );
}