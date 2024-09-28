import { useState } from "react";
import { Resume } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AutosizeTextarea } from "@/components/ui/auto-resize-textarea";

interface JobInfoProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume | undefined>>;
}

export function JobInfo({ resume, setResume }: JobInfoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJobInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResume(prevResume => {
      if (!prevResume) return prevResume;
      return {
        ...prevResume,
        job_info: event.target.value
      };
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="cursor-text">
            <Label htmlFor="jobDescription" className="text-lg font-semibold">
              Job Info
            </Label>
            <div 
              className="mt-2 p-2 border rounded-md h-20 overflow-y-auto"
              style={{ cursor: 'text' }}
              role="textbox"
              tabIndex={0}
            >
              {resume.job_info || 'Click to edit job description...'}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Information</DialogTitle>
          </DialogHeader>
          <AutosizeTextarea
            id="jobDescription"
            placeholder="Paste job description or listing here..."
            className="mt-2"
            rows={15}
            maxHeight={500}
            value={resume.job_info || ''}
            onChange={handleJobInfoChange}
            onKeyDown={handleKeyDown}
          />
        </DialogContent>
      </Dialog>
      <div className="flex justify-end mt-2">
        <Button>
          Customize Resume
        </Button>
      </div>
    </div>
  );
}