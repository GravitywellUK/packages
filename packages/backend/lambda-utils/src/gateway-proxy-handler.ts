import { curry } from "ramda";
import {
  APIGatewayProxyEvent, Context, APIGatewayProxyResult
} from "aws-lambda";
import * as Sentry from "@sentry/node";
import { createDebug } from "@gravitywelluk/debug";

import { JSONApiResponseObject, buildApiResponse } from "./build-api-response";

const debug = createDebug("GATEWAY-PROXY");

// init sentry
if (process.env.SENTRY_DSN) {
  // init sentry
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

export interface LambdaOptions {
  /** Runs at start of lambda - returns and stops processing once complete */
  warmup?: () => Promise<void>,
  /** Runs at end of lambda - does not stop the lambda processing */
  cleanup?: () => Promise<void>
}
/**
 * Wraps a lambda function so that we can return static JSONAPI response objects
 *
 * @param handler
 */
export const gatewayProxyHandler = <TResult extends Record<string, unknown>>(handler: APIGatewayProxyHandlerAsync<TResult>, options?: LambdaOptions): HandlerAsync => {
  return async (event: CustomAPIGatewayProxyEvent, context: Context) => {
    if (options?.warmup) {
      debug.info("Warming up function");

      return await options.warmup();
    }

    // Transform queryStringParameters to content multiple arrays.
    if (event.multiValueQueryStringParameters) {
      // Parse event params as json
      for (const key in event.multiValueQueryStringParameters) {
        if (key.endsWith("[]") && event.multiValueQueryStringParameters[ key ]) {
          if (event.queryStringParameters) {
            delete event.queryStringParameters[ key ];
            event.queryStringParameters[ key.replace("[]", "") ] = JSON.stringify(event.multiValueQueryStringParameters[ key ].map(el => JSON.parse(el)));
          }
        }
      }
    }

    // wrap event and contexts for all responses
    const response = curry(buildApiResponse)(event, context);

    try {
      console.log("TRY handler");
      const result = await handler(event, context);

      // flush to send events to sentry
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      return response(result);
    } catch (error) {
      const responseError = response(error);

      // flush to send events to sentry
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      console.log("ERROR", responseError);

      return responseError;
    }
  };
};
// custom types to remove callback
type HandlerAsync = (event: CustomAPIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult | void>;
export type APIGatewayProxyHandlerAsync<TResult extends Record<string, unknown>> = (event: CustomAPIGatewayProxyEvent, context: Context) => Promise<JSONApiResponseObject<TResult>>;

export interface CustomAPIGatewayProxyEvent extends Omit<APIGatewayProxyEvent, "pathParameters" | "queryStringParameters"> {
  pathParameters?: Record<string, unknown>;
  queryStringParameters?: Record<string, unknown>;
}