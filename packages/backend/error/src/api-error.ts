import { createDebug } from "@gravitywelluk/debug";

import { ErrorType } from "./error-type";

const debug = createDebug("ERROR");

export interface ApiErrorResponse {
  /** HTTP status code */
  statusCode: ErrorType;
  /** Title of HTTP status code */
  title: string;
  /** User-facing error message */
  message: string;
  /** Additional relevant error details */
  detail?: Record<string, unknown>;
}

/**
 * API Error class, storing error type, message and additional details
 */
export default class APIError extends Error {
  public readonly type: ErrorType;
  public readonly detail?: Record<string, unknown>;

  /**
   * @param type The type of error to throw - each of these maps to a distinct HTTP status code
   * @param msg The user-facing error message
   * @param detail Any additional details about the error
   */
  constructor(type: ErrorType, msg: string, detail?: Record<string, unknown>) {
    super(msg);
    debug.error(msg, type);
    this.type = type;
    this.detail = detail;
  }

  /**
   * Formats the given ApiError into a structured response
   *
   * @param error - The ApiError to output
   */
  public static formatApiError(error: APIError): ApiErrorResponse {
    return {
      statusCode: error.type,
      title: ErrorType[ error.type ],
      message: error.message,
      detail: error.detail
    };
  }
}
