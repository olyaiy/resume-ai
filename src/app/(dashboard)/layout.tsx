// (dashboard)/layout.tsx

import DashboardLayout from '@/components/dashboard-layout';
import NavBar from '@/components/nav-bar';
import { ReactNode } from 'react';



export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
      <>
        <NavBar />
        <DashboardLayout>
        {children}
        </DashboardLayout>
      </>

  );
}