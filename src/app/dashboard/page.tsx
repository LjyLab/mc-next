import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, LayoutGrid, List } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "nextjs-commerce",
    domain: "commerce.vercel.app",
    repo: "vercel/nextjs-commerce",
    branch: "main",
    lastCommit: "Update dependency next to v14.1.0",
    timeAgo: "2m ago",
    status: "ready" as const,
  },
  {
    id: 2,
    name: "ai-chatbot-starter",
    domain: "ai-chat.vercel.app",
    repo: "vercel/ai-chatbot",
    branch: "main",
    lastCommit: "fix: streaming response issues",
    timeAgo: "1h ago",
    status: "building" as const,
  },
  {
    id: 3,
    name: "image-gallery",
    domain: "gallery-demo.vercel.app",
    repo: "vercel/image-gallery",
    branch: "develop",
    lastCommit: "feat: add cloudinary support",
    timeAgo: "3h ago",
    status: "ready" as const,
  },
  {
    id: 4,
    name: "platforms-starter-kit",
    domain: "platforms.vercel.app",
    repo: "vercel/platforms",
    branch: "main",
    lastCommit: "chore: update middleware matcher",
    timeAgo: "5h ago",
    status: "error" as const,
  },
  {
    id: 5,
    name: "virtual-event-starter",
    domain: "virtual-event.vercel.app",
    repo: "vercel/virtual-event-starter",
    branch: "main",
    lastCommit: "docs: update README deployment steps",
    timeAgo: "1d ago",
    status: "ready" as const,
  },
  {
    id: 6,
    name: "next-rsc-demo",
    domain: "rsc-demo.vercel.app",
    repo: "vercel/next-rsc-demo",
    branch: "main",
    lastCommit: "refactor: use server actions",
    timeAgo: "2d ago",
    status: "ready" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            className="h-10 pl-9 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-input"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-md border border-input bg-background p-1">
             <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-muted">
                <LayoutGrid className="h-4 w-4 text-foreground" />
             </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-muted">
                <List className="h-4 w-4 text-muted-foreground" />
             </Button>
          </div>
          <Button className="h-10 font-medium px-4">
            Add New...
          </Button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
