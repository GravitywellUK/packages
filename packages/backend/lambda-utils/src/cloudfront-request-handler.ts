import {
  CloudFrontRequest,
  CloudFrontRequestEvent,
  Context
} from "aws-lambda";
import * as Sentry from "@sentry/node";

// init sentry
if (process.env.SENTRY_DSN) {
  const client = Sentry.getCurrentHub().getClient();

  if (!client) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

export type HandlerAsync<TEvent = unknown, TResult = unknown> = (event: TEvent, context: Context) => Promise<TResult>;
export type CloudFrontRequestHandlerAsync = HandlerAsync<CloudFrontRequestEvent, CloudFrontRequest>;

/**
 * Creates a type CloudFront event handler for a request event
 *
 * @param handler
 */
export const cloudFrontRequestHandler = (handler: CloudFrontRequestHandlerAsync): CloudFrontRequestHandlerAsync => {
  return async (event: CloudFrontRequestEvent, context: Context) => {
    try {
      return await handler(event, context);
    } catch (error) {
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      throw error;
    }
  };
};