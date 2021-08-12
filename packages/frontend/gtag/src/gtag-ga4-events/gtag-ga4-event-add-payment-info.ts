import { gtagEvent } from "../gtag-event";

import { GtagGa4EventEcommerceAttributes } from "./types";

export interface GtagGa4EventAddPaymentInfoParamAttributes extends GtagGa4EventEcommerceAttributes {
  payment_type?: GtagGa4EventAddPaymentInfoPaymentType
}

export enum GtagGa4EventAddPaymentInfoPaymentType {
  CREDIT_CARD = "Credit Card",
  DEBIT_CARD = "Debit Card",
}

/**
 * Tracks an add_payment_info event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#add_payment_info
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventAddPaymentInfo = (params: GtagGa4EventAddPaymentInfoParamAttributes): void => {
  gtagEvent("add_payment_info", params);
};