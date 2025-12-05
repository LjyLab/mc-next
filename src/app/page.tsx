import { db } from '@/db';
import { users } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { UserForm } from '@/components/UserForm';
import { UserList } from '@/components/UserList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="z-10 max-w-5xl w-full items-start justify-between font-mono text-sm lg:flex gap-12">
        <div className="flex flex-col gap-8 w-full lg:w-1/3">
          <h1 className="text-4xl font-bold mb-4">Drizzle ORM Demo</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            This is a simple CRUD demonstration using Next.js App Router, Server Actions, and Drizzle ORM.
          </p>
          <UserForm />
        </div>
        
        <div className="flex flex-col gap-8 w-full lg:w-2/3 mt-12 lg:mt-0">
          <UserList users={allUsers} />
        </div>
      </div>
    </main>
  );
}
