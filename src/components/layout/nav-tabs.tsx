'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLayoutSettings } from '@/hooks/use-layout-settings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: '概览', href: '/dashboard' },
  { 
    name: '部署', 
    href: '/dashboard/deployments',
    children: [
      { name: '所有部署', href: '/dashboard/deployments' },
      { name: '生产环境', href: '/dashboard/deployments/production' },
      { name: '预览环境', href: '/dashboard/deployments/preview' },
    ]
  },
  { name: '集成', href: '/dashboard/integrations' },
  { name: '活动', href: '/dashboard/activity' },
  { name: '域名', href: '/dashboard/domains' },
  { name: '用量', href: '/dashboard/usage' },
  { 
    name: '设置', 
    href: '/dashboard/settings',
    children: [
      { name: '通用设置', href: '/dashboard/settings' },
      { name: '团队', href: '/dashboard/settings/teams' },
      { name: '计费', href: '/dashboard/settings/billing' },
    ]
  },
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
          const isActive = pathname === item.href || item.children?.some(child => pathname === child.href);
          
          const baseClasses = cn(
            "text-sm font-medium rounded-md px-3 h-8 flex items-center transition-all relative whitespace-nowrap",
            isActive
              ? "text-foreground after:absolute after:left-0 after:right-0 after:bottom-[-9px] after:h-[2px] after:bg-foreground after:content-['']"
              : "text-muted-foreground hover:text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800"
          );

          if (item.children) {
            return (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger className={cn(baseClasses, "outline-none gap-1")}>
                  {item.name}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href} className={cn("w-full cursor-pointer", pathname === child.href && "bg-accent")}>
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={baseClasses}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
