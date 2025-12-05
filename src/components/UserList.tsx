'use client';

import { deleteUser } from '@/app/actions';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export function UserList({ users }: { users: User[] }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold">Users List</h2>
      {users.length === 0 ? (
        <p className="text-zinc-500">No users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-zinc-900 shadow-sm"
            >
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-zinc-500">{user.email}</p>
                <p className="text-xs text-zinc-400">
                  Joined: {new Date(user.createdAt).toISOString().split('T')[0]}
                </p>
              </div>
              <button
                onClick={() => deleteUser(user.id)}
                className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-200 hover:border-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
