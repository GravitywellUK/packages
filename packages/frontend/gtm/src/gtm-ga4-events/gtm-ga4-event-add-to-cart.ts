import { gtmEvent } from "../gtm-event";
import { GtmGa4EventEcommerceAttributes } from "./types";

export type GtmGa4EventAddToCartParamAttributes = Omit<GtmGa4EventEcommerceAttributes, "coupon">;

/**
 * Tracks an add_to_cart event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#add_to_cart
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventAddToCart = (params: GtmGa4EventAddToCartParamAttributes): void => {
  gtmEvent("add_to_cart", { ecommerce: params }, [ "ecommerce" ]);
};