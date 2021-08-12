import { gtagEvent } from "../gtag-event";

import { GtagGa4EventEcommerceAttributes } from "./types";

export interface GtagGa4EventAddShippingInfoParamAttributes extends GtagGa4EventEcommerceAttributes {
  shipping_tier?: GtagGa4EventAddShippingInfoShoppingTier
}

export enum GtagGa4EventAddShippingInfoShoppingTier {
  GROUND = "Ground",
  AIR = "Air",
  NEXT_DAY = "Next-day",
}

/**
 * Tracks an add_shipping_info event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#add_shipping_info
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventAddShippingInfo = (params: GtagGa4EventAddShippingInfoParamAttributes): void => {
  gtagEvent("add_shipping_info", params);
};