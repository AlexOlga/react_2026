import { errorMessages } from '../shared/text';
const errorMessagesMap: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'You need to log in to continue.',
  403: 'You do not have permission to perform this action.',
  404: 'Not found.',
  500: 'Server error. Please try again later.',
};

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
