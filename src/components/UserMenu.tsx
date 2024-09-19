'use client'

import { Button } from "./ui/button";
import { logout } from "@/app/actions";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <span className="text-sm">{email}</span>
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
}