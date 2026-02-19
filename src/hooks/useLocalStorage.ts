import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initValue: T) => {
  const [value, setValue] = useState(() => {
    const fromLocal = localStorage.getItem(key);

    try {
      if (fromLocal) return JSON.parse(fromLocal);
      else return initValue;
    } catch (err) {
      console.error(err);
      return initValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
