import { ReactNode } from 'react';
import { Button } from './ui/button';



interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="flex h-full w-64 flex-col justify-center bg-secondary border-r-2 border-border">

        <div className="flex shrink-0 items-center flex-col">
          <Button variant="ghost">Link 1</Button>
          <Button variant="ghost">Link 2</Button>
          <Button variant="ghost">Link 3</Button>
          <Button variant="ghost">Link 4</Button>
        </div>
      </div>
      {children}
    </div>
  );
}