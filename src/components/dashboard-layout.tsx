import { ReactNode } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="flex h-full w-64 flex-col justify-center bg-secondary border-r-2 border-border">
        <div className="flex shrink-0 items-center flex-col">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" className="w-full">Dashboard</Button>
          </Link>
          <Link href="/editor" passHref>
            <Button variant="ghost" className="w-full">New Resume</Button>
          </Link>
          <Link href="/resumes" passHref>
            <Button variant="ghost" className="w-full">Resumes</Button>
          </Link>
          <Link href="/profile" passHref>
            <Button variant="ghost" className="w-full">Profile</Button>
          </Link>
          <Link href="/settings" passHref>
            <Button variant="ghost" className="w-full">Settings</Button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}