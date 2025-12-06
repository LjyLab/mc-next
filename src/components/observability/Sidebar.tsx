'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { sidebarGroups } from '@/config/observability';

export function ObservabilitySidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 flex-shrink-0 py-6 pr-6 hidden md:block">
      <div className="space-y-6">
        {sidebarGroups.map((group, index) => (
          <div key={index}>
            {group.title && (
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-pink-500/10 px-1.5 py-0.5 text-[10px] font-medium text-pink-500">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function ObservabilityMobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden space-y-6 py-4">
      {sidebarGroups.map((group, index) => (
        <div key={index}>
          {group.title && (
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {group.title}
            </h3>
          )}
          <div className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  className={cn(
                    'group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-pink-500/10 px-1.5 py-0.5 text-[10px] font-medium text-pink-500">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
