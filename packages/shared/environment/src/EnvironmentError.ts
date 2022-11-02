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
  constructor(type: ErrorType, msg: string, detail?: Record<string, unknown>) {
    super(type, msg, detail);
  }
}