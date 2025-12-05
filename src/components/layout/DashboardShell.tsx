'use client';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useLayoutSettings } from '@/hooks/use-layout-settings';
import { cn } from '@/lib/utils';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isFullWidth } = useLayoutSettings();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main
          className={cn(
            'flex flex-1 flex-col transition-all duration-300 ease-in-out',
            isFullWidth ? 'w-full p-6' : 'container mx-auto py-6 px-4 md:px-6'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
