import {
  Context,
  S3Handler,
  S3Event,
  Callback
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
export const s3TriggerHandler = (handler: S3Handler, options?: Pick<LambdaOptions, "cleanup">) => {
  return async (event: S3Event, context: Context, callback: Callback<void>): Promise<void> => {
    try {
      await handler(
        event, context, callback
      );

      return;
    } catch (error) {
      // flush to send events to sentry
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      callback(error as Error);

      return;
    }
  };
};
