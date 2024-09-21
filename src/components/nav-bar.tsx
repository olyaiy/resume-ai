'use client'
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserMenu } from "./UserMenu";
import { NewResumeDialog } from "./NewResumeDialog";
import { UserProfile } from "@/lib/types";
import { getProfile } from "@/app/actions";
import { use } from 'react';



export default function NavBar({profile}: {profile: UserProfile}) {


  return (
    <div className="absolute z-10 w-full h-auto  border-b-2 border-border p-2 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <Link href="/dashboard" passHref>
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <NewResumeDialog triggerButton={
          <Button variant="ghost">New Resume</Button>
        } />

        
        <Link href="/resumes" passHref>
          <Button variant="ghost">Resumes</Button>
        </Link>
        <Link href="/profile" passHref>
          <Button variant="ghost">Profile</Button>
        </Link>
        <Link href="/settings" passHref>
          <Button variant="ghost">Settings</Button>
        </Link>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <UserMenu email={profile.username} />
        <ModeToggle />
      </div>
    </div>
  );
}