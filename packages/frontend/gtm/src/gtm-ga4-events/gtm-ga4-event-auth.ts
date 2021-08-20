import { gtmEvent } from "../gtm-event";

interface GtmGa4EventAuth {
  (eventName: "login", method: GtmGa4EventAuthMethod): void;
  (eventName: "sign_up", method: GtmGa4EventAuthMethod): void;
}

/**
 * Tracks an GA4 authentication event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#login
 * @see https://developers.google.com/gtagjs/reference/ga4-events#sign_up
 * @param event - The GA4 authentication event name
 * @param method - The authentication method used.
 */
export const gtmGa4EventAuth: GtmGa4EventAuth = (eventName, method): void => {
  gtmEvent(eventName, { method });
};

export enum GtmGa4EventAuthMethod {
  APPLE = "Apple",
  AWS_COGNITO = "AWS Cognito",
  FACEBOOK = "Facebook",
  GITHUB = "GitHub",
  GOOGLE = "Google",
  LINKEDIN = "LinkedIn",
  SLACK = "Slack",
  TWITTER = "Twitter",
  WINDOWS_LIVE = "Windows Live"
}