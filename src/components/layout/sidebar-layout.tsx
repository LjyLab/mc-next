'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  items: SidebarItem[];
}

export function SidebarLayout({ children, items }: SidebarLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] gap-8">
      <aside className="w-full">
        <nav className="flex flex-col space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
