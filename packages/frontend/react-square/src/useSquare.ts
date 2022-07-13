import {
  useCallback,
  useState,
  useEffect,
  useRef
} from "react";
import { createDebug } from "@gravitywelluk/debug";

import {
  Payments,
  Card,
  VerificationDetails
} from ".";

const logger = createDebug("SQUARE");

interface UseSquareParams {
  /** Your Square Location ID */
  locationId: string;
  /** Your Square Application ID */
  appId: string;
  /** Use sandbox scripts */
  sandbox: boolean;
  /** HTML Element ID to load the card form into. Defaults to `#card-container` */
  cardElementId?: string
}

interface UseSquareState {
  loading: boolean;
  error?: string;
  ready: boolean;
  cardForm: Card | null;
}

interface UseSquareMethods {
  /**
   * This generates a payment token (card nonce) that can be used to take
   * payment on the server. The ‘error’ thrown from this async function denotes
   * a failed tokenization, which is due to buyer error (such as an expired card).
   */
  tokenize: () => Promise<string | undefined>;
  /**
   * Verification tokens encapsulate customer device information
   * and 3-D Secure challenge results to indicate that Square has
   * verified the buyer identity
   */
  verifyBuyer: (
    /** Payment nonce from the Card */
    token: string,
    /** Details about the billing contact, amount to pay and intent */
    verificationDetails: VerificationDetails
  ) => Promise<string | undefined>;
}

/**
 * Use Square hook
 */
export const useSquare = ({
  sandbox,
  locationId,
  appId,
  cardElementId = "#card-container"
}: UseSquareParams): [UseSquareState, UseSquareMethods] => {
  const payments = useRef<Payments>();
  const [ ready, setReady ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ cardForm, setCardForm ] = useState<Card | null>(null);
  const [ error, setError ] = useState<string>();
  const squareScript = sandbox ? "https://sandbox.web.squarecdn.com/v1/square.js" : "https://web.squarecdn.com/v1/square.js";

  // Initialise the card form
  const initialiseCard = useCallback(async (payments: Payments) => {
    const cardForm = await payments.card();

    // Attaches Card Form to given html element
    await cardForm.attach(cardElementId);
    setCardForm(cardForm);
  }, [ setCardForm, cardElementId ]);

  // Load Square scripts
  useEffect(() => {
    if (!ready) {
      const sqPaymentScript = document.createElement("script");

      sqPaymentScript.src = squareScript;
      sqPaymentScript.type = "text/javascript";
      sqPaymentScript.async = false;

      sqPaymentScript.onload = () => {
        setReady(true);
      };
      document.getElementsByTagName("head")[ 0 ].appendChild(sqPaymentScript);
    }
  }, [ ready, squareScript ]);

  // Initialise Square with secrets
  useEffect(() => {
    const initialiseSquare = async () => {
      if (!window?.Square || !appId || !locationId) {
        logger.error("Square.js failed to load properly");
        setError("There was a problem loading the payment provider scripts.");

        return;
      }

      payments.current = window.Square.payments(appId, locationId);

      try {
        await initialiseCard(payments.current);
      } catch (e) {
        setError("There was a problem initialising the card form.");
        logger.error("Initializing Card failed", e);

        return;
      }
    };

    if (ready && !cardForm) {
      initialiseSquare();
    }
  }, [
    initialiseCard,
    ready,
    cardForm,
    appId,
    locationId
  ]);

  /**
   * This generates a payment token (card nonce) that can be used to take
   * payment on the server. The ‘error’ thrown from this async function denotes
   * a failed tokenization, which is due to buyer error (such as an expired card).
   */
  const tokenize = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    if (!cardForm) {
      const errorMessage = "Check that the card form has been loaded.";

      logger.error(errorMessage);
      setError(errorMessage);
    } else {
      const tokenResult = await cardForm.tokenize();

      if (tokenResult.status === "OK") {
        setLoading(false);

        return tokenResult.token;
      } else {
        setLoading(false);
        let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;

        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(
            tokenResult.errors
          )}`;
        }

        setError(errorMessage);
        logger.error(errorMessage);

        throw "Check that your card details are correct and your card is valid.";
      }
    }
  }, [ cardForm ]);

  /**
   * Verification tokens encapsulate customer device information
   * and 3-D Secure challenge results to indicate that Square has
   * verified the buyer identity
   */
  const verifyBuyer = useCallback(async (token: string, verificationDetails: VerificationDetails) => {
    setLoading(true);
    setError(undefined);

    try {
      if (!payments.current) {
        throw "Scripts not setup correctly";
      }

      const verificationResults = await payments.current?.verifyBuyer(
        token,
        verificationDetails
      );

      setLoading(false);

      return verificationResults.token;
    } catch (error) {
      setLoading(false);

      if (typeof error === "string") {
        setError(error);
      }

      logger.error(error);
      throw error;
    }
  }, [ ]);

  return [
    {
      loading,
      error,
      ready,
      cardForm
    },
    {
      tokenize,
      verifyBuyer
    }
  ];
};
