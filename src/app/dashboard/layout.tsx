import { DashboardShell } from '@/components/layout/DashboardShell';
import { LayoutSettingsProvider } from '@/hooks/use-layout-settings';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutSettingsProvider>
      <DashboardShell>{children}</DashboardShell>
    </LayoutSettingsProvider>
  );
}
