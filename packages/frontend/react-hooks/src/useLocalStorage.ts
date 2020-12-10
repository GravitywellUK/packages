import * as React from "react";
import { createDebug } from "@gravitywelluk/debug";

const logger = createDebug("LOCAL_STORAGE");

type SetLocalStorageValue<T> = (valueOrCallback: React.SetStateAction<T>) => void;
/**
 * Use local storage hook
 */
export const useLocalStorage = <T = Record<string, unknown>>(key: string, initialValue: T): [
  T,
  SetLocalStorageValue<T>
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
  // can pass a callback to avoid useEffect loops if updating an existing value
  const setValue = React.useCallback<SetLocalStorageValue<T>>(valueOrCallback => {
    try {
      // standard use case (object)
      if (typeof valueOrCallback === "object") {
        const value = valueOrCallback;

        // Save state
        setStoredValue(value);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(value));

      // if a callback is passed
      } else {
        // type discrimination doesn't work properly here so need to cast
        const updateStoredValueCallback = valueOrCallback as (prevState: T) => T;

        setStoredValue(currentValue => {
          const updatedValue = updateStoredValueCallback(currentValue);

          window.localStorage.setItem(key, JSON.stringify(updatedValue));

          return updatedValue;
        });
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      logger.error(error);
    }
  },
  [ key ]);

  return [ storedValue, setValue ];
};