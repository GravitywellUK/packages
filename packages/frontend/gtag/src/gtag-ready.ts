/**
 * Checks that Gtag is ready
 */
export const gtagReady = (): boolean => {
  return "gtag" in window;
};