'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTransition } from "react";
import { deleteResume } from "@/app/actions";
import { useRouter } from "next/navigation";

interface DeleteResumeDialogProps {
    resumeId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteResumeDialog({ resumeId, isOpen, onOpenChange }: DeleteResumeDialogProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        startTransition(() => {
            deleteResume(resumeId)
                .then(() => {
                    onOpenChange(false);
                    router.refresh();
                })
                .catch((error) => {
                    console.error('Error deleting resume:', error);
                    // Handle error (e.g., show an error message)
                });
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this resume? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}