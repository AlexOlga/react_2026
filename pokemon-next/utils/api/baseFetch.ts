import { errorMessagesMap } from '@/constants/global';
import { errorMessages } from '@/shared/text';

async function baseFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: {
        revalidate: 180,
      },
    });    
    if (res.status === 404 || res.status === 400) {
      return null;
    }
    if (!res.ok) {
      throw new Error(errorMessagesMap[res.status] || errorMessages.other);
    }

    return await res.json();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : errorMessages.other;
    throw new Error(message);
  }
}
export default baseFetch;
