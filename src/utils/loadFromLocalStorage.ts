import { errorMessages } from '../shared/text';

export default function loadFromLocalStorage(key: string): string {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : '';
  } catch (e) {
    console.error(errorMessages.readingLocalStorage, e);
    return '';
  }
}
