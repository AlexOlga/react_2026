'use server';
import { redirect } from 'next/navigation';

export async function searchAction(formData: FormData) {
  const data = formData.get('query')?.toString() || '';
  const query = data.trim();
  redirect(`/?query=${encodeURIComponent(query)}&page=1`);
}
