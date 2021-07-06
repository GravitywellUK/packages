import * as React from "react";

interface UseScrollPositionResponse {
  x: number | undefined;
  y: number | undefined;
}

// Initial scroll position
const initialScrollPosition: UseScrollPositionResponse = {
  x: undefined,
  y: undefined
};

/**
 * Scroll position hook
 */
export const useScrollPosition = (element?: React.RefObject<HTMLElement>): UseScrollPositionResponse => {
  const isClient = typeof window === "object";
  const target = React.useMemo(() => element && element.current ? element.current : document.body, [ element ]);
  const [ initialised, setInitialised ] = React.useState(false);
  const [ scrollPosition, setScrollPostion ] = React.useState<UseScrollPositionResponse>(initialScrollPosition);

  /**
   * Updates the scroll position when called
   */
  const updateScrollPosition = React.useCallback(() => {
    const position = target.getBoundingClientRect();
    const x = position.left < 0 ? Math.abs(position.left) : -Math.abs(position.left);
    const y = position.top < 0 ? Math.abs(position.top) : -Math.abs(position.top);

    setScrollPostion({
      x,
      y
    });
  }, [ target ]);

  //
  React.useEffect(() => {
    // If window client exists and the scroll position have not been initialised,
    // set them and update state.
    if (isClient && !initialised) {
      // Update the initialised state
      setInitialised(true);
      // Initialise the scroll position
      updateScrollPosition();
      // Add "resize" event listener
      window.addEventListener("scroll", updateScrollPosition);
    }

    // On unmount, remove the "resize" event listener
    return () => {
      // If window client exists and the dimensions have been initialised
      if (isClient && initialised) {
        window.removeEventListener("scroll", updateScrollPosition);
      }
    };
  }, [
    initialised,
    isClient,
    target,
    updateScrollPosition
  ]);

  return scrollPosition;
};