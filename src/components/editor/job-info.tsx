import { useState } from "react";
import { Resume } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AutosizeTextarea } from "@/components/ui/auto-resize-textarea";
import { X, Plus } from "lucide-react";
import { extractJobKeywords } from "@/lib/ai-actions"; // Import the new function
import { ScrollArea } from "@/components/ui/scroll-area";
import { KeywordManagement } from "./keyword-management";

interface JobInfoProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume | undefined>>;
}

export function JobInfo({ resume, setResume }: JobInfoProps) {
  const [isJobInfoDialogOpen, setIsJobInfoDialogOpen] = useState(false);
  const [isKeywordsDialogOpen, setIsKeywordsDialogOpen] = useState(false);

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
      setIsJobInfoDialogOpen(false);
    }
  };

  const isJobInfoEmpty = !resume.job_info || resume.job_info.trim() === '';

  const handleKeywordDialogClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsKeywordsDialogOpen(true);
    }
  };

  return (
    <div>
      {/* Job Info Dialog */}
      <Dialog open={isJobInfoDialogOpen} onOpenChange={setIsJobInfoDialogOpen}>
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
      
      {/* Job Keywords Section */}
      <div className="mt-4">
        <Label htmlFor="jobKeywords" className="text-lg font-semibold">
          Job Keywords
        </Label>
        <Dialog open={isKeywordsDialogOpen} onOpenChange={setIsKeywordsDialogOpen}>
          <DialogTrigger asChild>
            <div className="mt-2 border rounded-md p-2 cursor-pointer">
              <div className="h-20 overflow-y-auto mb-2" onClick={handleKeywordDialogClick}>
                <div className="flex flex-wrap gap-2">
                  {resume.job_keywords && resume.job_keywords.length > 0 ? (
                    resume.job_keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center group relative max-h-12"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {keyword}
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground">Click to add keywords...</div>
                  )}
                </div>
              </div>
              <KeywordManagement
                resume={resume}
                setResume={setResume}
                isJobInfoEmpty={isJobInfoEmpty}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Job Keywords</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="flex flex-wrap gap-2">
                {resume.job_keywords && resume.job_keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center group relative max-h-12"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <KeywordManagement
              resume={resume}
              setResume={setResume}
              isJobInfoEmpty={isJobInfoEmpty}
              inDialog={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-end mt-4">
        <Button>
          Customize Resume
        </Button>
      </div>
    </div>
  );
}