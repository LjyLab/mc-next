'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Integrations', href: '/dashboard/integrations' },
  { name: 'Activity', href: '/dashboard/activity' },
  { name: 'Domains', href: '/dashboard/domains' },
  { name: 'Usage', href: '/dashboard/usage' },
  { name: 'Settings', href: '/dashboard/settings' },
];

export function ContextNav() {
  const pathname = usePathname();

  return (
    <div className="border-b bg-background overflow-x-auto">
      <div className="flex h-12 items-center gap-2 px-4 lg:px-6">
        {navItems.map((item) => {
          // Exact match for dashboard, prefix match for others if needed, 
          // but here strict match or sub-path match logic might be needed.
          // For now, simple logic:
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors px-3 py-1.5 rounded-md",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
