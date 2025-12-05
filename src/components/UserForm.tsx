'use client';

import { createUser } from '@/app/actions';

// This is a simple form component to add a user
export function UserForm() {
  return (
    <form action={createUser} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold">Add New User</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="border rounded px-3 py-2 bg-transparent"
          placeholder="John Doe"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="border rounded px-3 py-2 bg-transparent"
          placeholder="john@example.com"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add User
      </button>
    </form>
  );
}
