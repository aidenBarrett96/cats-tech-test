import { useCallback, useEffect, useState } from "react";

/**
 * @hook useLocalStorage
 *
 * This is a hook to manage local storage and sync it with React state
 *
 * @param key The key of the stored item
 * @param initialValue  The initial value for the state
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Get the local storage value when on the client
  useEffect(() => {
    const initialize = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (!item) return initialValue;

        return JSON.parse(item);
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    };

    setStoredValue(initialize());
  }, [initialValue, key]);

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    window.localStorage.removeItem(key);
  }, [initialValue, key]);

  return [storedValue, setValue, removeValue];
};
