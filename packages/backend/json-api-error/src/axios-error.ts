import { AxiosError } from "axios";

import {
  JSONApiErrorStatic,
  ERROR_CODE_ENUM,
  jsonApiError,
  JSONApiErrorJSON
} from "./json-api-error";

/**
 * Axios API error
 *
 * Creates a Axios JSON API error response
 *
 * @see http://jsonapi.org/
 */
export const jsonApiAxiosError = (err: AxiosError): JSONApiErrorStatic => {
  const response: JSONApiErrorJSON = {
    status: 500,
    title: "Unknown Error",
    details: "An unknown error occurred",
    code: ERROR_CODE_ENUM.UNKNOWN_ERROR
  };

  // If the domain or endpoint is not found
  if (err.code === "ENOTFOUND" || err.code === "EPROTO" || err.code === "ECONNREFUSED") {
    return jsonApiError({
      code: ERROR_CODE_ENUM.API_CONNECTION_ERROR,
      status: 404,
      source: { stack: err.stack },
      title: "Endpoint not found",
      details: err.message
    });
  }

  // Below catch any unexpected error which has a 400+ error code
  if (err.response && err.response.status >= 400) {
    // Set the error response
    let errorMessage = `${err.message}`;

    errorMessage += err.response && err.response.data.errors && err.response.data ? `: ${err.response.data.errors}` : "";

    return jsonApiError({
      code: ERROR_CODE_ENUM.API_ERROR,
      status: err.response.status,
      source: { stack: err.stack },
      title: "API request failure",
      details: errorMessage
    });
  }

  // Assume that the 'err' is already of type JSONApiResponse.
  return jsonApiError(response);
};
