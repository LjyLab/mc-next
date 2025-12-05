import { ObservabilitySidebar } from '@/components/observability/Sidebar';

export default function ObservabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ObservabilitySidebar />
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
