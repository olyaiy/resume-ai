import React, { useState } from "react";
import { Resume } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { extractJobKeywords } from "@/lib/ai-actions";

interface KeywordManagementProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume | undefined>>;
  isJobInfoEmpty: boolean;
  inDialog?: boolean;
}

export function KeywordManagement({ resume, setResume, isJobInfoEmpty, inDialog = false }: KeywordManagementProps) {
  const [newKeyword, setNewKeyword] = useState("");

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
    if (isJobInfoEmpty) return;
    try {
      const extractedKeywords = await extractJobKeywords(resume.job_info);
      setResume(prevResume => {
        if (!prevResume) return prevResume;
        return {
          ...prevResume,
          job_keywords: extractedKeywords
        };
      });
    } catch (error) {
      console.error("Error extracting job keywords:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <form onSubmit={handleAddKeyword} className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Add keyword..."
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          className="flex-grow h-9 text-sm"
          onClick={(e) => !inDialog && e.stopPropagation()}
        />
        <Button
          type="submit"
          size="icon"
          className="bg-green-500 hover:bg-green-600 text-white w-9 h-9"
          onClick={(e) => !inDialog && e.stopPropagation()}
        >
          <Plus className="h-4 w-16" />
        </Button>
      </form>
      <div className="flex justify-between mt-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={(e) => {
            if (!inDialog) e.stopPropagation();
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
            if (!inDialog) e.stopPropagation();
            handleFillFromJobInfo();
          }}
          disabled={isJobInfoEmpty}
        >
          Fill from Job Info
        </Button>
      </div>
      {inDialog && (
        <div className="mt-4">
          {resume.job_keywords && resume.job_keywords.map((keyword, index) => (
            <div
              key={index}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center group relative max-h-12 mb-2"
            >
              {keyword}
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}