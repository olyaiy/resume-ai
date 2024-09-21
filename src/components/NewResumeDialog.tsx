// NewResumeDialog.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FileText } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createResume } from "@/app/actions";

interface NewResumeDialogProps {
    triggerButton?: React.ReactNode;
}

export function NewResumeDialog({ triggerButton }: NewResumeDialogProps) {
    const [error, setError] = useState<string | null>(null);
    const [fillWithProfile, setFillWithProfile] = useState(true);
    const closeRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const handleCreateResume = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent default form submission behavior
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.currentTarget);
        const resumeName = formData.get('resumeName') as string;

        // Validate resume name
        if (!resumeName.trim()) {
            setError("Resume name is required");
            return;
        }

        // Create resume
        const result = await createResume(resumeName.trim(), fillWithProfile);
        console.log(resumeName.trim(), fillWithProfile)
        if (result.success) {
            closeRef.current?.click(); // Close the dialog
            router.push(`/editor/${result.id}`);
        } else {
            setError(result.message || "Failed to create resume");
        } 
    };

    return (
        <Dialog>
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
                <form onSubmit={handleCreateResume}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="resumeName">Resume Name</Label>
                            <Input
                                id="resumeName"
                                name="resumeName"
                                placeholder="Enter resume name"
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="fill-profile"
                                checked={fillWithProfile}
                                onCheckedChange={setFillWithProfile}
                            />
                            <Label htmlFor="fill-profile">Fill with profile information</Label>
                        </div>
                    </div>
                    <Button type="submit">Continue</Button>
                </form>
                <DialogClose ref={closeRef} className="hidden" />
            </DialogContent>
        </Dialog>
    );
}