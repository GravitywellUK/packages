import {
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

import { CustomAPIGatewayProxyEvent } from "./gateway-proxy-handler";

/**
   * Send a JSON API response in the form of a APIGatewayProxyResult
   *
   * @param event An AWS API Gateway proxy event object
   * @param event An AWS API Gateway proxy event object
   * @param data A JSON API response object
   * @param allowedOrigins A collection of origins to allow
   */
export const buildApiResponse = <D extends unknown>(
  event: CustomAPIGatewayProxyEvent, _context: Context, data: D | APIError<unknown> | Error, allowedOrigins?: string[]
): APIGatewayProxyResult => {
  if (allowedOrigins) {
    const currentOrigin = event.headers ? event.headers.origin : null;
    let isOriginAllowed = false;

    // Check if origin is in allowed origins
    allowedOrigins.map(allowedOrigin => {
      if (!isOriginAllowed && currentOrigin && currentOrigin.match(allowedOrigin)) {
        isOriginAllowed = true;
      }
    });

    // Return an error if origin is not allowed or if there's no origin
    if (!isOriginAllowed || !currentOrigin) {
      const error = new APIError("Forbidden - origin not allowed", ErrorType.ForbiddenError);
      const { statusCode, ...formattedError } = APIError.formatApiError(error);

      return {
        statusCode,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": currentOrigin ?? allowedOrigins[ 0 ],
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ error: formattedError })
      };
    }
  }

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
