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
    const [isLoading, setIsLoading] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const handleCreateResume = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const resumeName = formData.get('resumeName') as string;

        if (!resumeName.trim()) {
            setError("Resume name is required");
            setIsLoading(false);
            return;
        }

        try {
            const result = await createResume(resumeName.trim(), fillWithProfile);
            if (result.success) {
                closeRef.current?.click();
                router.push(`/editor/${result.id}`);
            } else {
                setError(result.message || "Failed to create resume");
            }
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
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
                    <Button type="submit" disabled={isLoading} className="w-full h-10">
                        {isLoading ? (
                            <span className="flex items-center justify-center space-x-2">
                                <span className="sr-only">Loading...</span>
                                <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="h-2 w-2 bg-current rounded-full animate-bounce"></div>
                            </span>
                        ) : (
                            'Continue'
                        )}
                    </Button>
                </form>
                <DialogClose ref={closeRef} className="hidden" />
            </DialogContent>
        </Dialog>
    );
}