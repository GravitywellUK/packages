/**
 * Checks that Gtag is ready
 */
export const gtagReady = (): boolean => {
  const isGtagReady = "gtag" in window;

  // Log if not in production
  if (process.env.NODE_ENV !== "production") {
    console.log("Gtag :: gtagReady()", isGtagReady);
  }

  return isGtagReady;
};