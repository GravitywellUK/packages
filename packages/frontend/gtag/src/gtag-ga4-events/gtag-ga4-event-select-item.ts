import { gtagEvent } from "../gtag-event";

import { GtagGa4EventEcommerceAttributes } from "./types";

export interface GtagGa4EventSelectItemParamAttributes extends Pick<GtagGa4EventEcommerceAttributes, "items"> {
  item_list_id?: string;
  item_list_name?: string;
}

/**
 * Tracks a select_item event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#select_item
 * @param Params - Parameters to include in the event
 */
export const gtagGa4EventSelectItem = (params: GtagGa4EventSelectItemParamAttributes): void => {
  gtagEvent("select_item", params);
};