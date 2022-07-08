import { isFromSquare } from "../src/is-from-square";
import { testBody } from "../__fixtures__/test-templates";

// The URL where event notifications are sent.
const NOTIFICATION_URL = "https://9zgs6ao4oh.execute-api.eu-west-2.amazonaws.com/sam/offsets/webhooks/payment-made";
// The event notification subscription signature key (sigKey) defined in dev portal for app.
const SIG_KEY = "fQTqYxOpQFyLaTgwBMRvzw";

describe("is-from-square", () => {
  test("Verifies a good request", async () => {
    const rawBody = testBody;
    const squareSignature = "2W8osEsBOldL8eMSOTeI+rEgS10=";
    const eventIsFromSquare = isFromSquare(SIG_KEY, NOTIFICATION_URL, squareSignature, rawBody);

    expect(eventIsFromSquare).toBeTruthy();
  });

  test("Rejects a bad request", async () => {
    const rawBody = testBody;
    const squareSignature = "not_good_signature";
    const eventIsFromSquare = isFromSquare(SIG_KEY, NOTIFICATION_URL, squareSignature, rawBody);

    expect(eventIsFromSquare).toBeFalsy();
  });
});
