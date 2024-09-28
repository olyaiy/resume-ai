import React, { useState } from "react";
import { Resume } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Loader2 } from "lucide-react";
import { extractJobKeywords } from "@/lib/ai-actions";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KeywordManagementProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume | undefined>>;
  isJobInfoEmpty: boolean;
  maxKeywords: number;
  setMaxKeywords: (value: number) => void;
}

export function KeywordManagement({ resume, setResume, isJobInfoEmpty, maxKeywords, setMaxKeywords }: KeywordManagementProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isKeywordsDialogOpen, setIsKeywordsDialogOpen] = useState(false);

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

  const handleFillFromJobInfo = async () => {
    if (isJobInfoEmpty || isLoading) return;
    setIsLoading(true);
    try {
      const extractedKeywords = await extractJobKeywords(resume.job_info, maxKeywords);
      setResume(prevResume => {
        if (!prevResume) return prevResume;
        return {
          ...prevResume,
          job_keywords: extractedKeywords
        };
      });
    } catch (error) {
      console.error("Error extracting job keywords:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setResume(prevResume => {
      if (!prevResume) return prevResume;
      return {
        ...prevResume,
        job_keywords: prevResume.job_keywords.filter((_, index) => index !== indexToRemove)
      };
    });
  };

  return (
    <Dialog open={isKeywordsDialogOpen} onOpenChange={setIsKeywordsDialogOpen}>
      <DialogTrigger asChild>
        <div className="mt-2 border rounded-md p-2 cursor-pointer">
          <div className="h-20 overflow-y-auto mb-2">
            <div className="flex flex-wrap gap-2">
              {resume.job_keywords && resume.job_keywords.length > 0 ? (
                resume.job_keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center group relative max-h-12 hover:bg-secondary/80 dark:hover:bg-secondary/60 transition-colors duration-200"
                  >
                    {keyword}
                    <button
                      className="ml-2 text-destructive hover:text-destructive/80 transition-colors duration-200"
                      onClick={() => removeKeyword(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground">Click to add keywords...</div>
              )}
            </div>
          </div>
          <form onSubmit={handleAddKeyword} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Add keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-grow h-9 text-sm"
              onClick={(e) => !isKeywordsDialogOpen && e.stopPropagation()}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-green-500 hover:bg-green-600 text-white w-9 h-9"
              onClick={(e) => !isKeywordsDialogOpen && e.stopPropagation()}
            >
              <Plus className="h-4 w-16" />
            </Button>
          </form>
          {isKeywordsDialogOpen && (
            <div className="flex items-center gap-2 mt-2">
              <Label htmlFor="maxKeywords" className="text-sm">Max Keywords:</Label>
              <Input
                id="maxKeywords"
                type="number"
                min="1"
                max="50"
                value={maxKeywords}
                onChange={(e) => setMaxKeywords && setMaxKeywords(parseInt(e.target.value))}
                className="w-20 h-8 text-sm"
              />
            </div>
          )}
          <div className="flex justify-between mt-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={(e) => {
                if (!isKeywordsDialogOpen) e.stopPropagation();
                handleClearAllKeywords();
              }}
            >
              Clear All
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                if (!isKeywordsDialogOpen) e.stopPropagation();
                handleFillFromJobInfo();
              }}
              disabled={isJobInfoEmpty || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                `Fill from Job Info (Max ${maxKeywords})`
              )}
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Keywords</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ScrollArea className="h-[300px] pr-4">
            <div className="flex flex-wrap gap-2">
              {resume.job_keywords && resume.job_keywords.length > 0 ? (
                resume.job_keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center group relative max-h-12 hover:bg-secondary/80 dark:hover:bg-secondary/60 transition-colors duration-200"
                  >
                    {keyword}
                    <button
                      className="ml-2 text-destructive hover:text-destructive/80 transition-colors duration-200"
                      onClick={() => removeKeyword(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground">No keywords added yet...</div>
              )}
            </div>
          </ScrollArea>
          <form onSubmit={handleAddKeyword} className="flex items-center gap-2 mt-4">
            <Input
              type="text"
              placeholder="Add keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-grow h-9 text-sm"
            />
            <Button type="submit" size="icon" className="bg-green-500 hover:bg-green-600 text-white w-9 h-9">
              <Plus className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex items-center gap-2 mt-4">
            <Label htmlFor="maxKeywords" className="text-sm">Max Keywords:</Label>
            <Input
              id="maxKeywords"
              type="number"
              min="1"
              max="50"
              value={maxKeywords}
              onChange={(e) => setMaxKeywords(parseInt(e.target.value))}
              className="w-20 h-8 text-sm"
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleClearAllKeywords}
            >
              Clear All
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleFillFromJobInfo}
              disabled={isJobInfoEmpty || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                `Fill from Job Info (Max ${maxKeywords})`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}