import { gtagEvent } from "../gtag-event";
import { GtagGa4EventEcommerceAttributes } from "./types";

export type GtagGa4EventAddToCartParamAttributes = Omit<GtagGa4EventEcommerceAttributes, "coupon">;

/**
 * Tracks an add_to_cart event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#add_to_cart
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventAddToCart = (params: GtagGa4EventAddToCartParamAttributes): void => {
  gtagEvent("add_to_cart", params);
};