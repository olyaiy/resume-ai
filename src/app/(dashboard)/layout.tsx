// (dashboard)/layout.tsx

import DashboardLayout from '@/components/dashboard-layout';
import NavBar from '@/components/nav-bar';
import { UserProfile } from '@/lib/types';
import { ReactNode, use } from 'react';
import { getProfile } from '../actions';





export default function Layout({
  children,
}: {
  children: ReactNode
}) {


  // Get profile
  const data: UserProfile = use(getProfile())

  return (
      <>
        <NavBar profile={data} />
        <DashboardLayout>
        {children}
        </DashboardLayout>
      </>

  );
}