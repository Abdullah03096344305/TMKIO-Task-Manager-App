'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const hideNavbar =
    pathname === '/' ||
    pathname?.startsWith('/tasks') ||
    pathname?.startsWith('/landing');

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
