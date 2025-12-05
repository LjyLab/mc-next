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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown, 
  LayoutDashboard, 
  Rocket, 
  Blocks, 
  Activity, 
  Globe, 
  PieChart, 
  Settings,
  CheckCircle,
  Eye,
  Users,
  CreditCard,
  List,
  LineChart
} from 'lucide-react';
import { useState, useRef } from 'react';

type NavChildItem = 
  | { type: 'item'; name: string; href: string; icon?: React.ReactNode }
  | { type: 'separator' };

type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavChildItem[];
};

const navItems: NavItem[] = [
  { name: '概览', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { 
    name: '部署', 
    href: '/dashboard/deployments',
    icon: <Rocket className="h-4 w-4" />,
    children: [
      { type: 'item', name: '所有部署', href: '/dashboard/deployments', icon: <List className="h-4 w-4" /> },
      { type: 'separator' },
      { type: 'item', name: '生产环境', href: '/dashboard/deployments/production', icon: <CheckCircle className="h-4 w-4" /> },
      { type: 'item', name: '预览环境', href: '/dashboard/deployments/preview', icon: <Eye className="h-4 w-4" /> },
    ]
  },
  { name: '集成', href: '/dashboard/integrations', icon: <Blocks className="h-4 w-4" /> },
  { name: '活动', href: '/dashboard/activity', icon: <Activity className="h-4 w-4" /> },
  { name: '域名', href: '/dashboard/domains', icon: <Globe className="h-4 w-4" /> },
  { name: '用量', href: '/dashboard/usage', icon: <PieChart className="h-4 w-4" /> },
  { name: '可观测性', href: '/dashboard/observability', icon: <LineChart className="h-4 w-4" /> },
  { 
    name: '设置', 
    href: '/dashboard/settings',
    icon: <Settings className="h-4 w-4" />,
    children: [
      { type: 'item', name: '通用设置', href: '/dashboard/settings', icon: <Settings className="h-4 w-4" /> },
      { type: 'separator' },
      { type: 'item', name: '团队', href: '/dashboard/settings/teams', icon: <Users className="h-4 w-4" /> },
      { type: 'item', name: '计费', href: '/dashboard/settings/billing', icon: <CreditCard className="h-4 w-4" /> },
    ]
  },
];

function NavItemDropdown({ item, isActive, baseClasses }: { item: NavItem, isActive: boolean, baseClasses: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger 
        className={cn(baseClasses, "outline-none gap-1 data-[state=open]:bg-zinc-200 dark:data-[state=open]:bg-zinc-800")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => e.preventDefault()}
      >
        {item.icon}
        <span>{item.name}</span>
        <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        sideOffset={8}
        className="w-48 bg-[var(--header-bg)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.children?.map((child, index) => {
          if (child.type === 'separator') {
            return <DropdownMenuSeparator key={index} />;
          }
          const isChildActive = pathname === child.href;
          return (
            <DropdownMenuItem key={child.href} asChild>
              <Link 
                href={child.href} 
                className={cn(
                  "w-full cursor-pointer flex items-center gap-2", 
                  isChildActive && "bg-accent"
                )}
              >
                {child.icon}
                <span>{child.name}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavTabs() {
  const pathname = usePathname();
  const { isFullWidth } = useLayoutSettings();

  return (
    <div className="border-b bg-[var(--header-bg)] overflow-x-auto scrollbar-hide">
      <div className={cn(
        "flex h-12 items-center gap-2 transition-all duration-300 ease-in-out", // Changed gap-1 to gap-2
        isFullWidth 
          ? "w-full px-4 sm:px-6" 
          : "w-full max-w-7xl mx-auto px-4 sm:px-6"
      )}>
        {navItems.map((item) => {
          // Check if item itself is active or any of its children
          const isChildActive = item.children?.some(child => 
            child.type === 'item' && pathname === child.href
          );
          const isActive = pathname === item.href || isChildActive;
          
          const baseClasses = cn(
            "text-sm font-medium rounded-md px-3 h-8 flex items-center transition-all relative whitespace-nowrap gap-2",
            isActive
              ? "text-foreground after:absolute after:left-0 after:right-0 after:bottom-[-9px] after:h-[2px] after:bg-foreground after:content-['']"
              : "text-muted-foreground hover:text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800"
          );

          if (item.children) {
            return <NavItemDropdown key={item.href} item={item} isActive={isActive || false} baseClasses={baseClasses} />;
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={baseClasses}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
