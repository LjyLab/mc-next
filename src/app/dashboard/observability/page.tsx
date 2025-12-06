'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  Search,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

function MockChart({ color = 'blue' }: { color?: 'blue' | 'orange' }) {
  const strokeColor = color === 'blue' ? '#3b82f6' : '#f97316'; // blue-500 : orange-500
  
  return (
    <div className="relative h-32 w-full mt-4">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-muted-foreground">
        <span>8</span>
        <span>4</span>
        <span>0</span>
      </div>
      
      {/* Chart Area */}
      <div className="ml-6 h-full border-b border-l border-border relative">
         {/* Mock Line */}
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,100 L80,100 L82,40 L84,100 L100,100"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
         </svg>
      </div>

      {/* X-axis labels */}
      <div className="ml-6 flex justify-between mt-1 text-[10px] text-muted-foreground">
        <span>12小时前</span>
        <span>3分钟前</span>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subValue, color = 'blue' }: { title: string, value: string, subValue?: string, color?: 'blue' | 'orange' }) {
  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-1">调用次数</div>
        <div className="text-2xl font-bold">{value}</div>
        {subValue && <div className="text-xs text-muted-foreground">{subValue}</div>}
        <MockChart color={color} />
      </CardContent>
    </Card>
  );
}

export default function ObservabilityPage() {
  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard title="边缘请求" value="8" />
        <MetricCard title="快速数据传输" value="101 KB" />
        <MetricCard title="Vercel 函数" value="6" color="orange" />
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              中间件调用
            </CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-1">调用次数</div>
            <div className="text-2xl font-bold">0</div>
            <div className="h-32 w-full mt-4 flex items-center justify-center border-b border-l border-border ml-6">
              <span className="text-sm text-muted-foreground">在此时间范围内无调用</span>
            </div>
            <div className="ml-6 flex justify-between mt-1 text-[10px] text-muted-foreground">
              <span>12小时前</span>
              <span>3分钟前</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & List */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索..."
            className="pl-9"
          />
        </div>

        <div className="rounded-md border">
          <div className="flex items-center justify-between p-3 border-b bg-muted/50 text-xs font-medium text-muted-foreground">
            <span>项目</span>
            <span>请求数 <ChevronDown className="inline h-3 w-3" /></span>
          </div>
          <div>
             {[
               { name: 'content-review', count: 5 },
               { name: 'hot_api', count: 3 }
             ].map((item, i) => (
               <div key={item.name} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-muted/50 transition-colors">
                 <div className="flex items-center gap-2">
                   <div className={`w-1 h-3 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                   <span className="text-sm font-medium">{item.name}</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-32 h-6 bg-secondary rounded relative overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 bottom-0 ${i === 0 ? 'bg-blue-500/20' : 'bg-orange-500/20'}`} 
                        style={{ width: `${item.count * 10}%` }} 
                      />
                      <span className="absolute inset-0 flex items-center px-2 text-xs">{item.count}</span>
                   </div>
                   <ChevronRight className="h-4 w-4 text-muted-foreground" />
                 </div>
               </div>
             ))}
          </div>
          <div className="p-2 border-t bg-muted/50 flex items-center justify-end gap-2">
            <span className="text-xs text-muted-foreground">1 of 1</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-6 w-6" disabled>
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" className="h-6 w-6" disabled>
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
