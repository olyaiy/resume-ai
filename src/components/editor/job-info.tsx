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

interface JobInfoProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume | undefined>>;
}

export function JobInfo({ resume, setResume }: JobInfoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");

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

  const handleAddKeyword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newKeyword.trim()) {
      setResume(prevResume => {
        if (!prevResume) return prevResume;
        return {
          ...prevResume,
          job_keywords: [...(prevResume.job_keywords || []), newKeyword.trim()]
        };
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setResume(prevResume => {
      if (!prevResume) return prevResume;
      return {
        ...prevResume,
        job_keywords: prevResume.job_keywords.filter(keyword => keyword !== keywordToRemove)
      };
    });
  };

  const handleClearAllKeywords = () => {
    setResume(prevResume => {
      if (!prevResume) return prevResume;
      return {
        ...prevResume,
        job_keywords: []
      };
    });
  };

  const handleFillFromProfile = () => {
    // This is a placeholder function. You'll need to implement the logic
    // to fetch keywords from the user's profile and add them to job_keywords.
    console.log("Fill from profile functionality to be implemented");
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
      
      <div className="mt-4">
        <Label htmlFor="jobKeywords" className="text-lg font-semibold">
          Job Keywords
        </Label>
        <div className="mt-2 flex flex-col">
          <div className="flex flex-wrap gap-2 min-h-[120px] max-h-[120px] overflow-y-auto p-2 border rounded-md">
            {resume.job_keywords && resume.job_keywords.length > 0 ? (
              resume.job_keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center group relative max-h-12"
                >
                  {keyword}
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground">Add your keywords here...</div>
            )}
          </div>
          <form onSubmit={handleAddKeyword} className="flex items-center mt-2">
            <Input
              type="text"
              placeholder="Add keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-grow h-8 text-sm mr-2"
            />
            <Button
              type="submit"
              className="p-1 bg-green-500 hover:bg-green-600 text-white w-8 aspect-square mr-2"
            >
              <Plus size={16} />
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleClearAllKeywords}
              className="h-8 text-sm mr-2"
            >
              Clear All
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              onClick={handleFillFromProfile}
              className="h-8 text-sm"
            >
              Fill from Job Info
            </Button>
          </form>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button>
          Customize Resume
        </Button>
      </div>
    </div>
  );
}