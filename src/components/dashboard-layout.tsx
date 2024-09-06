import { ReactNode } from 'react';


import SideBar from './side-bar';
import NavBar from './nav-bar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-screen flex flex-row h-screen">
      <SideBar />
      <div className="w-full m-4 rounded-md bg-red-500 ml-[17rem] mt-[4.5rem] p-4 overflow-scroll">
        {children}
      </div>
    </div>
  );
}