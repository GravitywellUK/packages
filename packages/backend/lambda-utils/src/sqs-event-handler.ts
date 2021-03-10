import {
  Context,
  SQSHandler,
  Callback,
  SQSEvent
} from "aws-lambda";
import * as Sentry from "@sentry/node";

import { LambdaOptions } from "./gateway-proxy-handler";

if (process.env.SENTRY_DSN) {
  const client = Sentry.getCurrentHub().getClient();

  if (!client) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

/**
 * Wraps an s3 trigger lambda function with sentry and any other useful stuff
 *
 * @param handler
 */
export const sqsEventHandler = (handler: SQSHandler, options?: Pick<LambdaOptions, "cleanup">) => {
  return async (event: SQSEvent, context: Context, callback: Callback<void>): Promise<void> => {
    try {
      await handler(
        event, context, callback
      );

      if (options?.cleanup) {
        await options.cleanup();
      }

      return callback(null);
    } catch (error) {
      // flush to send events to sentry
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      return callback(error);
    }
  };
};
