import Link from 'next/link';
import { GitBranch, Github, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  name: string;
  domain: string;
  repo: string;
  branch: string;
  lastCommit: string;
  timeAgo: string;
  status: 'ready' | 'error' | 'building';
}

export function ProjectCard({
  name,
  domain,
  repo,
  branch,
  lastCommit,
  timeAgo,
  status,
}: ProjectCardProps) {
  return (
    <Card className="group flex flex-col border border-border bg-card text-card-foreground shadow-none transition-colors duration-200 hover:border-foreground/50 dark:hover:border-white rounded-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 pt-6 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground border border-border">
             <span className="font-bold text-sm">{name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold leading-none tracking-tight text-[15px]">{name}</h3>
            <Link
              href={`https://${domain}`}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              {domain}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
             <Link href={`https://${domain}`} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-4 w-4" />
             </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-2" />
      <CardFooter className="flex flex-col items-start gap-2 border-t border-border bg-card px-6 py-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 w-full">
          <span className="font-mono text-xs font-medium text-foreground bg-muted px-1.5 py-0.5 rounded-sm">{branch}</span>
          <span className="font-mono truncate max-w-[200px]">{lastCommit}</span>
          <span className="ml-auto text-muted-foreground">{timeAgo}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
