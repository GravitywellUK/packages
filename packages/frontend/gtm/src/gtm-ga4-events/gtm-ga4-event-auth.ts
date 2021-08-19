import { gtmEvent } from "../gtm-event";

export enum GtmGa4EventAuthType {
  LOGIN = "login",
  SIGN_UP = "sign_up"
}

export enum GtmGa4EventAuthMethod {
  AWS_COGNITO = "AWS Cognito"
}

/**
 * Tracks an authentication GA4 event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#login
 * @see https://developers.google.com/gtagjs/reference/ga4-events#sign_up
 * @param method - The authentication method used.
 */
export const gtagGa4EventAuth = (eventType: GtmGa4EventAuthType, method: GtmGa4EventAuthMethod): void => {
  gtmEvent(eventType, { method });
};