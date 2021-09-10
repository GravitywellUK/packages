import {
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import { APIError } from "@gravitywelluk/error";
import * as R from "ramda";

import { CustomAPIGatewayProxyEvent } from "./gateway-proxy-handler";

/**
   * Send a JSON API response in the form of a APIGatewayProxyResult
   *
   * @param event An AWS API Gateway proxy event object
   * @param event An AWS API Gateway proxy event object
   * @param data A JSON API response object
   */
export const buildApiResponse = <D extends unknown>(
  event: CustomAPIGatewayProxyEvent, _context: Context, data: D | APIError<unknown> | Error
): APIGatewayProxyResult => {
  // handle a none api error exception
  if (data instanceof APIError) {
    const formattedError = APIError.formatApiError(data);

    return {
      statusCode: formattedError.statusCode,
      body: JSON.stringify({ error: R.omit([ "statusCode" ], formattedError) })
    };
  } else if (data instanceof Error) {
    const formattedError = APIError.formatApiError(new APIError(data.message));

    return {
      statusCode: formattedError.statusCode,
      body: JSON.stringify({ error: R.omit([ "statusCode" ], formattedError) })
    };
  } else {
    // Set the JSON response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Access-Control-Allow-Origin": event.headers && event.headers.origin ? event.headers.origin : "*",
        "Access-Control-Allow-Credentials": true
      },
      body: typeof data === "object" ? JSON.stringify(data) : data as string
    };
  }
};
