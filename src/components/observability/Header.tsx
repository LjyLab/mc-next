'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  MoreHorizontal,
  Calendar,
} from 'lucide-react';

export function ObservabilityHeader() {
  const pathname = usePathname();
  
  // Define header configuration based on path
  const isOverview = pathname === '/dashboard/observability';
  const isQuery = pathname === '/dashboard/observability/query';
  
  let title = '可观测性';
  if (isQuery) {
    title = '查询';
  } else if (pathname === '/dashboard/observability/notebooks') {
    title = '笔记';
  } else if (pathname === '/dashboard/observability/alerts') {
    title = '告警';
  } else if (pathname === '/dashboard/observability/functions') {
    title = '函数';
  }
  // Add more mappings as needed based on routes

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      
      <div className="flex items-center gap-2">
        {isOverview && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  生产环境
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>生产环境</DropdownMenuItem>
                <DropdownMenuItem>预览环境</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-3 w-3" />
                  过去 12 小时
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>过去 1 小时</DropdownMenuItem>
                <DropdownMenuItem>过去 24 小时</DropdownMenuItem>
                <DropdownMenuItem>过去 7 天</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        <Button variant="outline" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
