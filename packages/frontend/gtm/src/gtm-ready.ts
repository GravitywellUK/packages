/**
 * Checks that GTM is ready
 */
export const gtmReady = (): boolean => {
  return typeof window !== "undefined" && "google_tag_manager" in window && "dataLayer" in window;
};