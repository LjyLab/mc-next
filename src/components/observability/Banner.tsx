'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function ObservabilityBanner() {
  return (
    <div className="rounded-lg border bg-background px-4 py-3 flex items-center justify-between shadow-sm mb-6">
      <div className="flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-yellow-500 shrink-0" />
        <span className="text-sm text-foreground">
          解锁异常告警、自定义查询、30天数据保留等功能，请升级至 Pro 和 Observability Plus。
        </span>
      </div>
      <Button size="sm" variant="default" className="h-7 text-xs font-medium whitespace-nowrap ml-2 shrink-0">
        升级至 Pro
      </Button>
    </div>
  );
}
