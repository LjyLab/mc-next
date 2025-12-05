'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  await db.insert(users).values({
    name,
    email,
  });

  revalidatePath('/');
}

export async function deleteUser(id: number) {
  await db.delete(users).where(eq(users.id, id));
  revalidatePath('/');
}
