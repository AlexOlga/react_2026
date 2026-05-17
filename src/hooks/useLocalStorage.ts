import { useEffect, useState } from 'react';
import { errorMessages } from '../shared/text';

const useLocalStorage = <T>(key: string, defaultData: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultData;
    } catch (e) {
      console.error(errorMessages.readingLocalStorage, e);

      return defaultData;
    }
  });
  useEffect(() => {
    const stored = JSON.stringify(state);
    localStorage.setItem(key, stored);
  }, [key, state]);
  return [state, setState] as const;
};
export default useLocalStorage;
