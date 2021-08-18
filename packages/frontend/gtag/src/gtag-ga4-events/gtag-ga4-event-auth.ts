import { gtagEvent } from "../gtag-event";

export enum GtagGa4EventAuthType {
  LOGIN = "login",
  SIGN_UP = "sign_up"
}

export enum GtagGa4EventAuthMethod {
  AWS_COGNITO = "AWS Cognito"
}

/**
 * Tracks an authentication GA4 event
 *
 * @see https://developers.google.com/gtagjs/reference/ga4-events#login
 * @see https://developers.google.com/gtagjs/reference/ga4-events#sign_up
 * @param method - The authentication method used.
 */
export const gtagGa4EventAuth = (eventType: GtagGa4EventAuthType, method: GtagGa4EventAuthMethod): void => {
  gtagEvent(eventType, { method });
};