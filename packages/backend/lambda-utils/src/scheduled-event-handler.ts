import {
  Context, ScheduledHandler, EventBridgeEvent, Callback
} from "aws-lambda";
import * as Sentry from "@sentry/node";

import { LambdaOptions } from "./gateway-proxy-handler";

if (process.env.SENTRY_DSN) {
  // init sentry
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

/**
 * Wraps an s3 trigger lambda function with sentry and any other useful stuff
 *
 * @param handler
 */
export const scheduledEventHandler = <TDetail extends unknown>(handler: ScheduledHandler, options?: Pick<LambdaOptions, "cleanup">) => {
  return async (event: EventBridgeEvent<"Scheduled Event", TDetail>, context: Context, callback: Callback<void>): Promise<void> => {
    try {
      await handler(
        event, context, callback
      );

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
