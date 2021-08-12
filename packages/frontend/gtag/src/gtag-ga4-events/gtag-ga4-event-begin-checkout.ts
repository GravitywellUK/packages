import { gtagEvent } from "../gtag-event";

import { GtagGa4EventEcommerceAttributes } from "./types";

export type GtagGa4EventBeginCheckoutParamAttributes = GtagGa4EventEcommerceAttributes;

/**
 * Tracks an begin_checkout event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#begin_checkout
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventBeginCheckout = (params: GtagGa4EventBeginCheckoutParamAttributes): void => {
  gtagEvent("begin_checkout", params);
};