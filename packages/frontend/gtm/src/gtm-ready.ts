/**
 * Checks that GTM is ready
 */
export const gtmReady = (): boolean => {
  return "google_tag_manager" in window && "dataLayer" in window;
};