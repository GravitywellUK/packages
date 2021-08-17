import {
  Context,
  Handler,
  S3Event,
  Callback
} from "aws-lambda";
import * as Sentry from "@sentry/node";

import { LambdaOptions } from "./gateway-proxy-handler";

// init sentry
if (process.env.SENTRY_DSN) {
  const client = Sentry.getCurrentHub().getClient();

  if (!client) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

/**
 * Wraps an cloudwatch trigger lambda function with sentry and any other useful stuff
 *
 * @param handler
 */
export const cloudwatchEventHandler = (handler: Handler, options?: Pick<LambdaOptions, "cleanup">) => {
  return async (event: S3Event, context: Context, callback: Callback<void>): Promise<void> => {
    try {
      await handler(
        event, context, callback
      );

      return;
    } catch (error) {
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      callback(error);

      return;
    }
  };
};
