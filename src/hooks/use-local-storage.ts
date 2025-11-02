import { useEffect } from 'react';

export const useLocalStorage = (
  key: string,
  data: Record<string, string>
) => {
  useEffect(() => {
    if (Object.values(data).some(v => v)) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }, [key, data]);
};

export const loadFromLocalStorage = (key: string): Record<string, string> | null => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};
