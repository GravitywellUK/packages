import {
  Context,
  Callback,
  Handler
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
 * Wraps a lambda function with sentry and any other useful stuff.
 * Useful when for lambdas that will only be invoked directly via another lambda (ie not via user request)
 *
 * @param handler
 */
export function customHandler<T = Record<string, unknown>>(handler: Handler<T>, options?: Pick<LambdaOptions, "cleanup">) {
  return async (event: T, context: Context, callback: Callback<void>): Promise<void> => {
    try {
      await handler(
        event, context, callback
      );

      if (options?.cleanup) {
        await options.cleanup();
      }

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
}
