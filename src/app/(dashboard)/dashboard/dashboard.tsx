'use client'

// Dashboard.tsx
import { useRouter } from "next/navigation";
import { Resume } from "@/lib/types";
import { createResume, deleteResume } from "@/app/actions";
import { useState, useTransition } from "react";
import { DeleteResumeDialog } from "@/components/DeleteResumeDialog";
import { NewResumeDialog } from "@/components/NewResumeDialog";
import { ResumeList } from "@/components/ResumeList";



export default function Dashboard({ resumeList }: { resumeList: Resume[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

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
            <NewResumeDialog />
            {/* <DeleteResumeDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirmDelete={confirmDelete}
                isPending={isPending}
            /> */}
            <ResumeList resumeList={resumeList} onDeleteResume={handleDeleteResume} />
        </div>
    );
}