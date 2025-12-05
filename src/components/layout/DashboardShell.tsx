'use client';

import { Header } from '@/components/layout/Header';
import { NavTabs } from '@/components/layout/nav-tabs';
import { useLayoutSettings } from '@/hooks/use-layout-settings';
import { cn } from '@/lib/utils';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isFullWidth } = useLayoutSettings();

  return (
    <div className="flex min-h-screen flex-col w-full bg-background text-foreground">
      <Header />
      <NavTabs />
      <main
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          isFullWidth ? 'w-full p-6' : 'container mx-auto py-8 px-4 md:px-6'
        )}
      >
        {children}
      </main>
    </div>
  );
}
