// DeleteResumeDialog.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface DeleteResumeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
    isPending: boolean;
}

export const DeleteResumeDialog = ({ isOpen, onClose, onConfirmDelete, isPending }: DeleteResumeDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this resume? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" onClick={onConfirmDelete} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};