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
import { Moon, Sun, Maximize2, Minimize2 } from 'lucide-react';
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
        <div className="flex items-center gap-2 font-bold text-lg">
          <img className="h-8 w-8 text-blue-500" src={ghostEmoji} />
          <span>梦创云端</span>
        </div>

        <div className="hidden h-6 w-px bg-border md:block mx-2" />
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">控制台</span>
          <Badge variant="outline" className="text-xs bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700">商业版</Badge>
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
            <DropdownMenuContent align="end" className="bg-(--header-bg)">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>设置</DropdownMenuItem>
              <DropdownMenuItem>支持</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
