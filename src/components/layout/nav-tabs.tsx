'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: '概览', href: '/dashboard' },
  { name: '部署', href: '/dashboard/deployments' },
  { name: '集成', href: '/dashboard/integrations' },
  { name: '设置', href: '/dashboard/settings' },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b bg-[var(--header-bg)] overflow-x-auto">
      <div className="flex h-12 items-center gap-2 px-4 lg:px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors px-3 py-3",
                isActive
                  ? "border-b-2 border-foreground text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
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
