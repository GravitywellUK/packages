<h1 align="center">Gravitywell Square JS</h1>
<p align="center">A React hook to help use Square JS in your project</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/use-square-hook" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/use-square-hook" alt="Version" />
</p>
<br />

## Usage

See below for an example implementation that:
- Loads the form from the Square SDK
- Tokenises the payment method
- Verifies the cardholder
- Submits a request to the server, where the Payments API can request a payment.

```typescript
import { useSquare } from "@gravitywelluk/use-square-hook";

const CollectPaymentPage = () => {

  // Initialise the form with your Square secrets
  const [{
    loading,
    error,
    ready,
    cardForm
  }, {
    tokenize,
    verifyBuyer
  }] = useSquare({
    appId: process.env.SQUARE_APPLICATION_ID,
    locationId: process.env.SQUARE_LOCATION_ID,
    sandbox: true,
    cardElementId: "#card-container"
  })


  /**
   * Handle the submission of payment details
   * Send a payment token, buyer name, and other details to the server
   * code so that a payment can be created with Payments API
   */
   const handlePaymentMethodSubmission = async () => {
    // Tokenize the user's card information
    const token = await tokenize();

      if(token) {
        // Verify the cardholder
        const verificationToken = await verifyBuyer(
          token,
          {
            amount: '1.00',
            billingContact: {
              addressLines: ['123 Main Street', 'Apartment 1'],
              familyName: 'Doe',
              givenName: 'John',
              email: 'jondoe@gmail.com',
              country: 'GB',
              phone: '3214563987',
              region: 'LND',
              city: 'London',
            },
            currencyCode: 'GBP',
            intent: 'CHARGE',
          });

          // Send to your server to create the payment
          request({
            locationId: process.env.SQUARE_LOCATION_ID,
            sourceId: token,
            verificationToken: verificationToken,
          });
      }


  });

}

```

