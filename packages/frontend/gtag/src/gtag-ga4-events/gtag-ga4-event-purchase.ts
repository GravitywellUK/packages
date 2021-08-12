import { gtagEvent } from "../gtag-event";

import { GtagGa4EventEcommerceAttributes } from "./types";

export interface GtagGa4EventPurchaseParamAttributes extends GtagGa4EventEcommerceAttributes {
  transaction_id: string;
  affiliation?: string;
  shipping?: number;
  tax?: number;
}

/**
 * Tracks a purchase event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#purchase
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventPurchase = (params: GtagGa4EventPurchaseParamAttributes): void => {
  gtagEvent("purchase", params);
};