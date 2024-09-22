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
import { UserProfile } from "@/lib/types"

interface ClearProfileButtonProps {
  profile: UserProfile
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>
}

export function ClearProfileButton({ profile, setProfile }: ClearProfileButtonProps) {
  const [open, setOpen] = useState(false)

  const handleClearProfile = () => {
    setProfile({
      ...profile,
      first_name: '',
      last_name: '',
      email: '',
      Github: '',
      Linkedin: '',
      Portfolio: '',
      skills: [],
      work_history: [],
      projects: [],
      education_history: [],
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Reset Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Clear Profile Content</DialogTitle>
          <DialogDescription>
            This action will remove all current content from your profile, including personal information, work history, education, skills, and projects. You'll be left with a blank profile. This cannot be undone. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleClearProfile}>Clear Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}