import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

/**
 * Environment Error class
 *
 * Custom APIError for an Environment error.
 */
export class EnvironmentError extends APIError {
  constructor(msg: string, type: ErrorType, detail?: Record<string, unknown>) {
    super(msg, type, detail);
  }
}