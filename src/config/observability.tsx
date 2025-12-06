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

export const sidebarGroups = [
  {
    title: null,
    items: [
      { name: '概览', href: '/dashboard/observability', icon: LayoutDashboard },
      { name: '查询', href: '/dashboard/observability/query', icon: Search },
      { name: '笔记', href: '/dashboard/observability/notebooks', icon: Book },
      { name: '告警', href: '/dashboard/observability/alerts', icon: AlertTriangle, badge: 'Beta' },
    ],
  },
  {
    title: '计算',
    items: [
      { name: '函数', href: '/dashboard/observability/functions', icon: Zap },
      { name: '外部 API', href: '/dashboard/observability/external-apis', icon: Globe },
      { name: '中间件', href: '/dashboard/observability/middleware', icon: Server },
      { name: '工作流', href: '/dashboard/observability/workflows', icon: GitMerge, badge: 'Beta' },
      { name: '沙箱', href: '/dashboard/observability/sandboxes', icon: Box, badge: 'Beta' },
    ],
  },
  {
    title: 'CDN',
    items: [
      { name: '边缘请求', href: '/dashboard/observability/edge-requests', icon: Network },
      { name: '快速数据传输', href: '/dashboard/observability/fast-data-transfer', icon: ArrowRightLeft },
      { name: '图像优化', href: '/dashboard/observability/image-optimization', icon: ImageIcon },
      { name: 'ISR', href: '/dashboard/observability/isr', icon: RefreshCw },
      { name: '外部重写', href: '/dashboard/observability/external-rewrites', icon: Repeat },
      { name: '微前端', href: '/dashboard/observability/microfrontends', icon: LayoutGrid },
    ],
  },
  {
    title: '服务',
    items: [
      { name: 'AI', href: '/dashboard/observability/ai', icon: Sparkles },
      { name: 'Blob', href: '/dashboard/observability/blob', icon: Database },
    ],
  },
];
