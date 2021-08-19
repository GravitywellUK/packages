/* eslint-disable @typescript-eslint/no-explicit-any */
import { gtmReady } from "./gtm-ready";

/**
 * Tracks the given GTM event
 *
 * @see https://developers.google.com/tag-manager/ecommerce-ga4
 * @param eventName - The name of the event
 * @param eventParams - Extra parameters to include with the event
 * @param clearParams - Used to clear previous object instantiations
 */
export const gtmEvent = (eventName: Gtag.EventNames | string, eventParams: Record<string, any>, clearParams?: string[]): void => {
  // Track an event if GTM exists and is ready
  if (gtmReady()) {
    // If clearParams have been given, use them to clear the previous object
    if (clearParams) {
      const clearData: Record<string, null> = {};

      for (const i in clearParams) {
        clearData[ clearParams[ i ] ] = null;
      }

      // Clear the previous object data
      (window.dataLayer as NonNullable<Window["dataLayer"]>).push(clearData);
    }

    // Trigger the event
    (window.dataLayer as NonNullable<Window["dataLayer"]>).push({
      event: eventName,
      ...eventParams
    });
  }
};