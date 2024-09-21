// NewResumeDialog.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createResume } from "@/app/actions";

interface NewResumeDialogProps {
    triggerButton?: React.ReactNode;
}

export const NewResumeDialog = ({ triggerButton }: NewResumeDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleCreateResume = async () => {
        const resumeName = inputRef.current?.value.trim();
        if (!resumeName) {
            setError("Resume name is required");
            return;
        }
        setError(null);
        
        const result = await createResume(resumeName);
        if (result.success) {
            router.push(`/editor/${result.id}`);
            setIsOpen(false);
        } else {
            setError(result.message || "Failed to create resume");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateResume();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {triggerButton || (
                    <Button className="h-12">
                        <FileText className="mr-2 h-4 w-4" />
                        New Resume
                    </Button>
                )}
            </DialogTrigger>

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
    );
};