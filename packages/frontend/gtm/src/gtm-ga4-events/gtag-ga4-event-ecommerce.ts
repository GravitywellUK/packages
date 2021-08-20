import { gtmEvent } from "../gtm-event";

interface GtmGa4EventEcommerce {
  (eventName: "add_payment_info", params: GtmGa4EventEcommerceAddPaymentInfoAttributes): void;
  (eventName: "add_shipping_info", params: GtmGa4EventEcommerceAddShippingInfoAttributes): void;
  (eventName: "add_to_cart", params: GtmGa4EventEcommerceAddToCartAttributes): void;
  (eventName: "begin_checkout", params: GtmGa4EventEcommerceBeginCheckoutAttributes): void;
  (eventName: "purchase", params: GtmGa4EventEcommercePurchaseAttributes): void;
}

/**
 * Tracks a GA4 e-commerce event
 *
 * @see https://developers.google.com/tag-manager/ecommerce-ga4
 * @param event - The GA4 e-commerce event name
 * @param params - Parameters to include in the event
 */
export const gtmGa4EventEcommerce: GtmGa4EventEcommerce = (eventName, params) => {
  gtmEvent(eventName, { ecommerce: params }, [ "ecommerce" ]);
};

export interface GtmGa4EventEcommerceAttributes {
  currency: string;
  value: number;
  items: GtmGa4EventEcommerceItemAttributes[];
  coupon?: string;
}

export interface GtmGa4EventEcommerceItemAttributes {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  currency?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
}

export interface GtmGa4EventEcommerceAddPaymentInfoAttributes extends GtmGa4EventEcommerceAttributes {
  payment_type?: GtmGa4EventAddPaymentInfoPaymentType
}

export enum GtmGa4EventAddPaymentInfoPaymentType {
  CREDIT_CARD = "Credit Card",
  DEBIT_CARD = "Debit Card",
}

export interface GtmGa4EventEcommerceAddShippingInfoAttributes extends GtmGa4EventEcommerceAttributes {
  shipping_tier?: GtmGa4EventEcommerceAddShippingInfoShoppingTier
}

export enum GtmGa4EventEcommerceAddShippingInfoShoppingTier {
  GROUND = "Ground",
  AIR = "Air",
  NEXT_DAY = "Next-day",
}

export interface GtmGa4EventEcommercePurchaseAttributes extends GtmGa4EventEcommerceAttributes {
  transaction_id: string;
  affiliation?: string;
  shipping?: number;
  tax?: number;
}

export type GtmGa4EventEcommerceAddToCartAttributes = Omit<GtmGa4EventEcommerceAttributes, "coupon">;
export type GtmGa4EventEcommerceBeginCheckoutAttributes = GtmGa4EventEcommerceAttributes;