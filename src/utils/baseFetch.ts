import { errorMessagesMap } from '../../pokemon-next/constants/global';
import { errorMessages } from '../../pokemon-next/shared/text';

async function baseFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);

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
