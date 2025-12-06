'use client';

import { MobileSidebar } from './MobileSidebar';
import { Badge } from '@/components/ui/badge';
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
import { Moon, Sun, Maximize2, Minimize2, Sparkles, BadgeCheck, CreditCard, Bell, LogOut, GalleryHorizontal, BadgeCheckIcon } from 'lucide-react';
import { getFluentEmojiCDN } from '@lobehub/fluent-emoji';
import { useLayoutSettings } from '@/hooks/use-layout-settings';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function Header() {
  const { setTheme, theme } = useTheme();
  const { isFullWidth, toggleWidth } = useLayoutSettings();
  const ghostEmoji = getFluentEmojiCDN('👻', { type: 'anim' });
  return (
    <header className="border-b bg-(--header-bg)">
      <div className={cn(
        "flex h-16 items-center gap-4 transition-all duration-300 ease-in-out",
        isFullWidth 
          ? "w-full px-4 sm:px-6" 
          : "w-full max-w-7xl mx-auto px-4 sm:px-6"
      )}>
        <div className="flex items-center gap-2 font-bold text-lg whitespace-nowrap">
          <img className="h-8 w-8 text-blue-500" src={ghostEmoji} />
          <span>梦创云端</span>
        </div>

        <div className="hidden h-6 w-px bg-border md:block mx-2" />
        
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">控制台</span>
          {/* <Badge variant="outline" className="text-xs bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700">商业版</Badge> */}
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            旗舰版
        </Badge>
        </div>

        <div className="w-full flex-1" />
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleWidth}
                  className="hidden sm:inline-flex"
                >
                  <GalleryHorizontal className="h-[1.2rem] w-[1.2rem]" />
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
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    m@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
