import { createDebug } from "@gravitywelluk/debug";

import { ErrorType } from "./error-type";

const debug = createDebug("ERROR");

export interface ApiErrorResponse<C extends Record<string, unknown> = Record<string, unknown>> {
  /** HTTP status code */
  statusCode: ErrorType;
  /** Title of HTTP status code */
  title: string;
  /** User-facing error message */
  message: string;
  /** Additional relevant error details */
  context?: C;
}

/**
 * API Error class, storing error type, message and additional details
 */
export default class APIError<C extends Record<string, unknown> = Record<string, unknown>> extends Error {
  public readonly type: ErrorType;
  public readonly context?: C;

  /**
   * @param msg The user-facing error message
   * @param type The type of error to throw - each of these maps to a distinct HTTP status code
   * @param context Any additional details about the error
   */
  constructor(msg: string, type: ErrorType, context?: C) {
    super(msg);
    debug.error(msg, type);
    this.type = type;
    this.context = context;
  }

  /**
   * Formats the given ApiError into a structured response
   *
   * @param error - The ApiError to output
   */
  public static formatApiError(error: APIError, includeContext?: boolean): ApiErrorResponse {
    return {
      statusCode: error.type,
      title: ErrorType[ error.type ],
      message: error.message,
      context: includeContext ? error.context : undefined
    };
  }
}
