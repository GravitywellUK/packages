/**
 * Checks that Gtag is ready
 */
export const gtagReady = (): boolean => {
  return "google_tag_manager" in window;
};