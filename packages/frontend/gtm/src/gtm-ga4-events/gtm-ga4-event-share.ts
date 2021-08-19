import { gtmEvent } from "../gtm-event";

export enum GtmGa4EventShareMethod {
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  LINKEDIN = "LinkedIn",
  PINTEREST = "Pinterest",
  REDDIT = "Reddit",
  TIKTOK = "TikTok",
  TWITTER = "Twitter",
  YOUTUBE = "YouTube"
}

/**
 * Tracks a share event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#share
 * @param itemRef - The item's reference/ID to track.
 * @param method - The share method used.
 */
export const gtmGa4EventShare = (itemRef: string, method: GtmGa4EventShareMethod): void => {
  gtmEvent("share", {
    content_type: "article",
    item_id: itemRef,
    method
  });
};