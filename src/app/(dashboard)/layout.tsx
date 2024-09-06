// (dashboard)/layout.tsx
import DashboardLayout from '@/components/dashboard-layout';
import { ReactNode } from 'react';



export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (

      <DashboardLayout>
      {children}
      </DashboardLayout>

  );
}