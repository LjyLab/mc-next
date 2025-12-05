'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Search,
  Book,
  AlertTriangle,
  Zap,
  Globe,
  Server,
  GitMerge,
  Box,
  Network,
  ArrowRightLeft,
  Image as ImageIcon,
  RefreshCw,
  Repeat,
  LayoutGrid,
  Sparkles,
  Database,
} from 'lucide-react';

const sidebarGroups = [
  {
    title: null,
    items: [
      { name: 'Overview', href: '/dashboard/observability', icon: LayoutDashboard },
      { name: 'Query', href: '/dashboard/observability/query', icon: Search },
      { name: 'Notebooks', href: '/dashboard/observability/notebooks', icon: Book },
      { name: 'Alerts', href: '/dashboard/observability/alerts', icon: AlertTriangle, badge: 'Beta' },
    ],
  },
  {
    title: 'COMPUTE',
    items: [
      { name: 'Functions', href: '/dashboard/observability/functions', icon: Zap },
      { name: 'External APIs', href: '/dashboard/observability/external-apis', icon: Globe },
      { name: 'Middleware', href: '/dashboard/observability/middleware', icon: Server },
      { name: 'Workflows', href: '/dashboard/observability/workflows', icon: GitMerge, badge: 'Beta' },
      { name: 'Sandboxes', href: '/dashboard/observability/sandboxes', icon: Box, badge: 'Beta' },
    ],
  },
  {
    title: 'CDN',
    items: [
      { name: 'Edge Requests', href: '/dashboard/observability/edge-requests', icon: Network },
      { name: 'Fast Data Transfer', href: '/dashboard/observability/fast-data-transfer', icon: ArrowRightLeft },
      { name: 'Image Optimization', href: '/dashboard/observability/image-optimization', icon: ImageIcon },
      { name: 'ISR', href: '/dashboard/observability/isr', icon: RefreshCw },
      { name: 'External Rewrites', href: '/dashboard/observability/external-rewrites', icon: Repeat },
      { name: 'Microfrontends', href: '/dashboard/observability/microfrontends', icon: LayoutGrid },
    ],
  },
  {
    title: 'SERVICES',
    items: [
      { name: 'AI', href: '/dashboard/observability/ai', icon: Sparkles },
      { name: 'Blob', href: '/dashboard/observability/blob', icon: Database },
    ],
  },
];

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
