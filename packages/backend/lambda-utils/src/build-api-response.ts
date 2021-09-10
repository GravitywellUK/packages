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
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": event.headers && event.headers.origin ? event.headers.origin : "*",
    "Access-Control-Allow-Credentials": true
  };

  // handle a none api error exception
  if (data instanceof Error) {
    const errorData = data instanceof APIError ? data : new APIError(data.message);
    const { statusCode, ...formattedError } = APIError.formatApiError(errorData);

    return {
      statusCode,
      headers,
      body: JSON.stringify({ error: formattedError })
    };
  } else {
    // Set the JSON response
    return {
      statusCode: 200,
      headers,
      body: typeof data === "object" ? JSON.stringify(data) : data as string
    };
  }
};
