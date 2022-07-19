export * from "./useSquare";

declare global {
  interface Window { Square: {
    payments: (appId: string, locationId: string) => Payments
  }; }
}

/** Square Card SDK methods */
export interface Card {
  /** Adds an event listener to the instance of the Card element. Provides specific typings related to card element events.  */
  addEventListener(): void
  /** Attaches the Card form to the page.  */
  attach(selectorOrElement: string | HTMLElement): Promise<void>
  /** Set field input style and behavior of the card payment input fields. For more information about customizing the card form, see available CardOptions.  */
  configure(): Promise<void>
  /** Destroys the card payment object. The attached element is emptied and all event listeners are removed.  */
  destroy (): Promise<boolean>
  /** Sets the DOM focus of one of the input fields within the credit card form.  */
  focus(): Promise<boolean>
  /** Recalculates the size of the card form.  */
  recalculateSize (): void
  /** Removes an event listener from the instance of the Card element. Provides specific typings related to card element events.  */
  removeEventListener(): void
  /** Tokenizes the card payment and returns a nonce.  */
  tokenize (): Promise<TokenResult>
}

/** Square Payment SDK methods */
export interface Payments {
  card(): Promise<Card>
  verifyBuyer(
    /** Payment nonce from the Card */
    token: string,
    /** Details about the billing contact, amount to pay and intent */
    verificationDetails: VerificationDetails
  ): Promise<VerifyBuyerResponse>
}

export interface VerifyBuyerResponse {
  token: string;
}

/* Details collected from the buyer */
export interface VerificationDetails {
  billingContact: {
    /** First / Given name e.g. `Jo` */
    givenName?: string;
    /** Family / Last name e.g. `Smith` */
    familyName?: string;
    /** Address lines e.g. `["123 Main Street", "Apartment 1"]` */
    addressLines?: string[];
    /** Email address */
    email?: string;
    /** Country Code e.g. `GB` */
    country?: string;
    /** Phone number as string */
    phone?: string;
    /** Region e.g. `LND` */
    region?: string;
    /** City e.g. `London` */
    city?: string;
  },
  /** The amount to charge e.g. `"25.99"`  */
  amount: string;
  /** Currency code e.g. `"GBP"` or `"USD"` */
  currencyCode: string;
  /** What you intend to do with the payment, e.g. `"CHARGE"`, `"STORE"` */
  intent: VerificationIntent;
}

export enum VerificationIntent {
  Charge = "CHARGE",
  Store = "STORE"
}

export interface TokenResult {
  /** Errors that occurred while attempting to tokenize.  */
  errors: TokenErrorDetails | Error[]
  /** Indicates whether the tokenization request was successful.  */
  status: TokenStatus
  /** Payment token representing tokenized payment information; for use with relevant Square APIs and buyer verification.  */
  token: string | undefined
}

export enum TokenStatus {
  /** Indicates tokenization was aborted.  */
  Abort = "Abort",
  /** Indicates tokenization was cancelled by the user.  */
  Cancel = "Cancel",
  /** Indicates tokenization was not successful.  */
  Error = "Error",
  /** Indicated validation has failed during tokenization  */
  Invalid = "Invalid",
  /** Indicates tokenization was successful.  */
  OK = "OK",
  /** Indicates an unknown tokenization status.  */
  Unknown = "Unknown",
}

export interface TokenErrorDetails {
  /** Particular field that caused the error, if applicable. E.g. Card Number  */
  field: string | undefined
  /** Error message.  */
  message: string
  /** Type of error thrown.  */
  type: string
}