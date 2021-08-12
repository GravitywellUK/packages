import { gtagReady } from "./gtag-ready";

/**
 * Tracks the given Gtag event
 *
 * @param eventName - The name of the event
 * @param eventParams - Extra parameters to include with the event
 */
export const gtagEvent = (eventName: Gtag.EventNames | string, eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams): void => {
  // Track an event if Gtag exists and is ready
  if (gtagReady()) {
    gtag("event", eventName, eventParams);
  }
};