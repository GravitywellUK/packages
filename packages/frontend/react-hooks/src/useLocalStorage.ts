import * as React from "react";
import { createDebug } from "@gravitywelluk/debug";

const logger = createDebug("LOCAL_STORAGE");

/**
 * Use local storage hook
 */
export const useLocalStorage = <T = Record<string, unknown>>(key: string, initialValue: T): [
  T,
  (value: T) => void
] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [ storedValue, setStoredValue ] = React.useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      logger.error(error);

      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists
  // the new value to localStorage.
  const setValue = React.useCallback((value: T) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // A more advanced implementation would handle the error case
      logger.error(error);
    }
  },
  [ key ]);

  return [ storedValue, setValue ];
};
