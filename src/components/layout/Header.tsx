'use client';

import { MobileSidebar } from './MobileSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import { Moon, Sun, Maximize2, Minimize2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLayoutSettings } from '@/hooks/use-layout-settings';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Header() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const { isFullWidth, toggleWidth } = useLayoutSettings();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-[var(--header-bg)] px-4 lg:px-6">
      <div className="flex items-center gap-2 font-bold text-lg">
        <div className="h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs">
          V
        </div>
        <span>Vercel</span>
      </div>

      <div className="hidden h-6 w-px bg-border md:block mx-2" />
      
      <div className="w-full flex-1">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {paths.slice(1).map((path) => (
               <div key={path} className="flex items-center">
                 <BreadcrumbSeparator />
                 <BreadcrumbItem>
                   <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
                 </BreadcrumbItem>
               </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleWidth}
              >
                {isFullWidth ? (
                  <Minimize2 className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Maximize2 className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">切换全屏/居中模式</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>切换全屏/居中模式</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>设置</DropdownMenuItem>
            <DropdownMenuItem>支持</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
