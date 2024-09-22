import { ReactNode } from 'react';



import NavBar from './nav-bar';
import { Button } from './ui/button';
import { generateEducationHistory } from '@/lib/ai-actions';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-screen flex flex-row h-screen">


      <div className="w-full m-4 rounded-md mt-[4.5rem] p-4 overflow-scroll">
        {children}
      </div>
    </div>
  );
}