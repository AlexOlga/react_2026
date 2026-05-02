import { errorMessages } from '../shared/text';

async function baseFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : errorMessages.notFound;
    throw new Error(message);
  }
}
export default baseFetch;
