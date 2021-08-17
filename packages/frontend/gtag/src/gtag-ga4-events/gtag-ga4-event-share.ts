import { gtagEvent } from "../gtag-event";

export enum GtagGa4EventShareMethod {
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
export const gtagGa4EventShare = (itemRef: string, method: GtagGa4EventShareMethod): void => {
  gtagEvent("share", {
    content_type: "article",
    item_id: itemRef,
    method
  });
};