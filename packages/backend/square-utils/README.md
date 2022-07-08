<h1 align="center">Gravitywell Square Utils</h1>
<p align="center">A library to assist in the implementation of Square</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/square-utils" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/square-utils" alt="Version" />
</p>
<br />


## Verify and Validate an Event Notification 
Because your notification URL is public and can be called by anyone, you must validate each event notification to confirm that it came from Square. A non-Square post can potentially compromise your application. All webhook notifications from Square include an x-square-signature header. The value of this header is an HMAC-SHA1 signature generated using your webhook signature key, the notification URL, and the raw body of the request. You can validate the webhook notification by generating the HMAC-SHA1 in your own code and comparing it to the signature of the event notification you received.

The following function generates an HMAC-SHA1 signature from your signature key, the notification URL, and the event notification body. You can then compare the result with the event notification's x-square-signature.

### Usage

```typescript
import { isFromSquare } from "@gravitywelluk/square-utils";

// The URL where event notifications are sent.
const NOTIFICATION_URL = 'https://example.com/webhook';

// The event notification subscription signature key (sigKey) defined in dev portal for app.
const SIG_KEY = '<SIGNATURE_KEY>';

export const handler = gatewayProxyHandler(async event => {

  const rawBody = event.body;
  const squareSignature = event.headers['x-square-signature'];
  const eventIsFromSquare = isFromSquare(SIG_KEY, NOTIFICATION_URL, squareSignature, rawBody);
})

```

