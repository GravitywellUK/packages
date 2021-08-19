/**
 * Checks that GTM is ready
 */
export const gtmReady = (): boolean => {
  const isGtmReady = "google_tag_manager" in window && "dataLayer" in window;

  // Log if not in production
  if (process.env.NODE_ENV !== "production") {
    console.log("GTM :: gtmReady()", isGtmReady);
  }

  return isGtmReady;
};