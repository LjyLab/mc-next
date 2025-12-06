'use client';

import * as React from "react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLayoutSettings } from '@/hooks/use-layout-settings';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
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
  LineChart,
} from 'lucide-react';
import { motion } from 'framer-motion';

type NavChildItem = 
  | { type: 'item'; name: string; href: string; icon?: React.ReactNode; description?: string }
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
      { 
        type: 'item', 
        name: '所有部署', 
        href: '/dashboard/deployments', 
        icon: <List className="h-4 w-4" />,
        description: "查看所有环境的部署历史记录和状态"
      },
      { type: 'separator' },
      { 
        type: 'item', 
        name: '生产环境', 
        href: '/dashboard/deployments/production', 
        icon: <CheckCircle className="h-4 w-4" />,
        description: "查看生产环境的当前状态和部署详情"
      },
      { 
        type: 'item', 
        name: '预览环境', 
        href: '/dashboard/deployments/preview', 
        icon: <Eye className="h-4 w-4" />,
        description: "查看预览环境的部署和测试情况"
      },
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
      { 
        type: 'item', 
        name: '通用设置', 
        href: '/dashboard/settings', 
        icon: <Settings className="h-4 w-4" />,
        description: "管理项目的基本配置和首选项"
      },
      { type: 'separator' },
      { 
        type: 'item', 
        name: '团队', 
        href: '/dashboard/settings/teams', 
        icon: <Users className="h-4 w-4" />,
        description: "管理团队成员和权限设置"
      },
      { 
        type: 'item', 
        name: '计费', 
        href: '/dashboard/settings/billing', 
        icon: <CreditCard className="h-4 w-4" />,
        description: "查看用量统计和管理订阅方案"
      },
    ]
  },
];

function NavUnderline() {
  return (
    <motion.div
      layoutId="nav-underline"
      className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-foreground z-10"
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
    />
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode; href: string }
>(({ className, title, children, icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            // TODO: 在这里调整样式
            "block select-none space-y-0.5 rounded-lg p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          {children && (
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function NavTabs() {
  const pathname = usePathname();
  const { isFullWidth } = useLayoutSettings();
  const isMobile = useIsMobile();

  return (
    <div className="border-b bg-[var(--header-bg)]">
      <div className={cn(
        "flex h-12 items-center transition-all duration-300 ease-in-out",
        isFullWidth 
          ? "w-full px-4 sm:px-6" 
          : "w-full max-w-7xl mx-auto px-4 sm:px-6"
      )}>
        <div className="flex items-center">
            {navItems.map((item) => {
              // Check if item itself is active or any of its children
              const isActive = pathname === item.href || item.children?.some(child => 
                child.type === 'item' && pathname === child.href
              );

              // Pure text/icon style, no background, mimics original tabs
              const triggerClass = cn(
                "group inline-flex h-9 w-max items-center justify-center px-3 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                "bg-transparent hover:bg-accent/50 focus:bg-accent/50 active:bg-accent/50 data-[state=open]:bg-accent/50 data-[active]:bg-accent/50",
                "rounded-md",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              );

              if (item.children) {
                return (
                  <div key={item.href} className="relative flex h-12 items-center">
                    <NavigationMenu viewport={!isMobile} delayDuration={0}>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className={triggerClass}>
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <span>{item.name}</span>
                            </div>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[260px] gap-1 p-0 md:w-[340px] md:grid-cols-2">
                              {item.children.map((child) => {
                                if (child.type === 'separator') {
                                  return null; 
                                }
                                
                                const isChildActive = pathname === child.href;
                                return (
                                  <ListItem
                                    key={child.href}
                                    href={child.href}
                                    title={child.name}
                                    icon={child.icon}
                                    className={cn(isChildActive && "bg-accent/50")}
                                  >
                                    {child.description}
                                  </ListItem>
                                );
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    {isActive && <NavUnderline />}
                  </div>
                );
              }

              return (
                <div key={item.href} className="relative flex h-12 items-center">
                  <Link href={item.href} className={cn(triggerClass, "cursor-pointer")}>
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                  {isActive && <NavUnderline />}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
