/**
 * Checks that Gtag is ready
 */
export const gtagReady = (): boolean => {
  return typeof window !== "undefined" && "gtag" in window;
};