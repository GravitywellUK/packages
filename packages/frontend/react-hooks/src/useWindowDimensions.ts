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
  const [ windowDimensions, setWindowDimensions ] = React.useState<UseWindowDimensionsResponse>(initialWindowDimensions);

  /**
   * Gets the window width and height dimensions
   */
  const getWindowDimensions = React.useCallback(() => {
    return {
      height: isClient ? window.innerHeight : undefined,
      width: isClient ? window.innerWidth : undefined
    };
  }, [ isClient ]);

  /**
   * Updates the window dimensions when changed
   */
  const handleWindowResize = React.useCallback(() => {
    setWindowDimensions(getWindowDimensions());
  }, [ getWindowDimensions ]);

  React.useEffect(() => {
    if (!isClient) {
      return;
    }

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [ handleWindowResize, isClient ]);

  return windowDimensions;
};