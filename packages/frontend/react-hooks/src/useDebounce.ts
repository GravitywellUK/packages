import React from "react";

/**
 * Use debounce hook
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [ debouncedValue, setDebouncedValue ] = React.useState(value);

  React.useEffect(() => {
    // Update debounced value after delay
    // if timeout cleared before callback triggered, value not updated
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Re-running the effect clears the previous timeout and starts a new one
    return () => {
      clearTimeout(handler);
    };
  // Only re-run effect if value or delay changes
  }, [ value, delay ]);

  return debouncedValue;
};