import crypto from "crypto";

/**
 * This function generates an HMAC-SHA1 signature from your signature key,
 * the notification URL, and the event notification body. You can then compare the
 * result with the event notification's x-square-signature.
 *
 * @param sigKey The event notification subscription signature key (sigKey) defined in dev portal for app.
 * @param notificationUrl The URL where event notifications are sent.
 * @param squareSignature x-square-signature from request headers
 * @param rawBody The raw event body
 *
 * @returns boolean to verify that the request is from Square
 */
export const isFromSquare = (
  sigKey: string,
  notificationUrl: string,
  squareSignature: string,
  rawBody: string
): boolean => {
  // create hmac signature
  const hmac = crypto.createHmac("sha1", sigKey);

  hmac.update(notificationUrl + rawBody);
  const hash = hmac.digest("base64");

  // compare to square signature
  return hash === squareSignature;
};
