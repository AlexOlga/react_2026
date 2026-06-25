'use server';
import { redirect } from '@/i18n/navigation';

export async function searchAction(locale: string, formData: FormData) {
  const data = formData.get('query')?.toString() || '';
  const query = data.trim();
  redirect({
    href: {
      pathname: '/',
      query: {
        query,
        page: '1',
      },
    },
    locale,
  });
}
