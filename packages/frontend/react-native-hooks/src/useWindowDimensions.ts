import * as React from "react";

interface UseWindowDimensionsResponse {
  width: number | undefined;
  height: number | undefined;
}

// Initial window dimensions
const initialWindowDimensions: UseWindowDimensionsResponse = {
  width: undefined,
  height: undefined
};

/**
 * Window dimensions hook
 */
export const useWindowDimensions = (): UseWindowDimensionsResponse => {
  const isClient = typeof window === "object";
  const [ initialised, setInitialised ] = React.useState(false);
  const [ windowDimensions, setWindowDimensions ] = React.useState<UseWindowDimensionsResponse>(initialWindowDimensions);

  /**
   * Updates the window dimensions when called
   */
  const updateWindowDimensions = React.useCallback(() => {
    setWindowDimensions({
      height: isClient ? window.innerHeight : undefined,
      width: isClient ? window.innerWidth : undefined
    });
  }, [ isClient ]);

  // On isClient change, attempt to set the window dimensions and add "reize"
  // event listeners.
  React.useEffect(() => {
    // If window client exists and the dimensions have not been initialised,
    // set them and update state.
    if (isClient && !initialised) {
      // Update the initialised state
      setInitialised(true);
      // Initialise the
      updateWindowDimensions();
      // Add "resize" event listener
      window.addEventListener("resize", updateWindowDimensions);
    }

    // On unmount, remove the "resize" event listener
    return () => {
      // If window client exists and the dimensions have been initialised
      if (isClient && initialised) {
        window.removeEventListener("resize", updateWindowDimensions);
      }
    };
  }, [
    initialised,
    isClient,
    updateWindowDimensions
  ]);

  return windowDimensions;
};