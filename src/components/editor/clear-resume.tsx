'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Resume } from "@/lib/types"

interface ClearResumeButtonProps {
  resume: Resume
  setResume: React.Dispatch<React.SetStateAction<Resume | undefined>>
}

export function ClearResumeButton({ resume,setResume }: ClearResumeButtonProps) {
  const [open, setOpen] = useState(false)

  const handleClearResume = () => {
    setResume({
      name: '',
      resume_name: resume.resume_name,
      skills: [],
      work_history: [],
      projects: [],
      education_history: [],
      collectionId: resume.collectionId,
      collectionName: resume.collectionName,
      created: resume.created,
      user: resume.user,
      id: resume.id,
      updated: '',
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Reset Resume</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Clear Resume Content</DialogTitle>
          <DialogDescription>
          This action will remove all current content from your resume, including work history, education, skills, and projects. You'll be left with a blank template. This cannot be undone. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleClearResume}>Clear Resume</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}