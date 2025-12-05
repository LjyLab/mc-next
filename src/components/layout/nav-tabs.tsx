'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLayoutSettings } from '@/hooks/use-layout-settings';

const navItems = [
  { name: '概览', href: '/dashboard' },
  { name: '部署', href: '/dashboard/deployments' },
  { name: '集成', href: '/dashboard/integrations' },
  { name: '活动', href: '/dashboard/activity' },
  { name: '域名', href: '/dashboard/domains' },
  { name: '用量', href: '/dashboard/usage' },
  { name: '设置', href: '/dashboard/settings' },
];

export function NavTabs() {
  const pathname = usePathname();
  const { isFullWidth } = useLayoutSettings();

  return (
    <div className="border-b bg-[var(--header-bg)] overflow-x-auto scrollbar-hide">
      <div className={cn(
        "flex h-12 items-center gap-1 transition-all duration-300 ease-in-out",
        isFullWidth 
          ? "w-full px-4 sm:px-6" 
          : "w-full max-w-7xl mx-auto px-4 sm:px-6"
      )}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium rounded-md px-3 h-8 flex items-center transition-all relative",
                isActive
                  ? "text-foreground after:absolute after:left-0 after:right-0 after:bottom-[-9px] after:h-[2px] after:bg-foreground after:content-['']"
                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800"
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
