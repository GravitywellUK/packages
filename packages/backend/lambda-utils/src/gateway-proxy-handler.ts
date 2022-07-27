import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import * as Sentry from "@sentry/node";
import { createDebug } from "@gravitywelluk/debug";

import { buildApiResponse } from "./build-api-response";

const debug = createDebug("GATEWAY-PROXY");

// init sentry
if (process.env.SENTRY_DSN) {
  const client = Sentry.getCurrentHub().getClient();

  if (!client) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

interface WarmupEvent {
  type: "warmup";
}
// type guard
const isWarmupEvent = (event: CustomAPIGatewayProxyEvent | WarmupEvent): event is WarmupEvent => (event as WarmupEvent).type === "warmup";

export interface LambdaOptions {
  /** Runs at start of lambda - returns and stops processing once complete */
  warmup?: () => Promise<void>;
  //** Runs before calling the handler */
  preRequest?: (event: CustomAPIGatewayProxyEvent, context: Context) => Promise<void>;
  /** Runs at end of lambda - does not stop the lambda processing */
  cleanup?: () => Promise<void>;
  allowedOrigins?: String[];
}
/**
 * Wraps a lambda function so that we can return static JSONAPI response objects
 *
 * @param handler
 */
export const gatewayProxyHandler = <TResult = unknown>(handler: APIGatewayProxyHandlerAsync<TResult>, options?: LambdaOptions): HandlerAsync => {
  return async (event: CustomAPIGatewayProxyEvent | WarmupEvent, context: Context) => {
    if (isWarmupEvent(event)) {
      debug.info("Warming up function!");

      if (options?.warmup) {
        return await options.warmup();
      }

      return;
    }

    // Transform queryStringParameters to content multiple arrays.
    if (event.multiValueQueryStringParameters) {
      // Parse event params as json
      for (const key in event.multiValueQueryStringParameters) {
        const queryStringParameter = event.multiValueQueryStringParameters[ key ];

        if (key.endsWith("[]") && queryStringParameter && event.queryStringParameters) {
          delete event.queryStringParameters[ key ];
          event.queryStringParameters[ key.replace("[]", "") ] = JSON.stringify(queryStringParameter.map(el => JSON.parse(el)));
        }
      }
    }

    try {
      // Execute preRequest before handler
      if (options?.preRequest) {
        await options.preRequest(event, context);
      }
      const result = await handler(event, context);

      // flush to send events to sentry
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      return buildApiResponse<TResult>(event, context, result, options?.allowedOrigins);
    } catch (error) {
      const responseError = buildApiResponse<TResult>(event, context, error as Error, options?.allowedOrigins);

      // flush to send events to sentry
      if (process.env.SENTRY_DSN) {
        // flush to send events to sentry
        await Sentry.flush(2000);
      }

      if (options?.cleanup) {
        await options.cleanup();
      }

      return responseError;
    }
  };
};
// custom types to remove callback
type HandlerAsync = (event: CustomAPIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult | void>;
export type APIGatewayProxyHandlerAsync<TResult = unknown> = (event: CustomAPIGatewayProxyEvent, context: Context) => Promise<TResult>;

export interface CustomAPIGatewayProxyEvent extends Omit<APIGatewayProxyEvent, "pathParameters" | "queryStringParameters"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pathParameters?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryStringParameters?: Record<string, any>;
}
