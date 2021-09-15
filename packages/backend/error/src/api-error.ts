import { createDebug } from "@gravitywelluk/debug";

const debug = createDebug("ERROR");

/** Available error codes */
export enum ErrorType {
  ApiError = "API_ERROR",
  ApiConectionError = "API_CONNECTION_ERROR",
  AuthenticationError = "AUTHENTICATION_ERROR",
  ForbiddenError = "FORBIDDEN_ERROR",
  InvalidData = "INVALID_DATA_ERROR",
  DatabaseError = "DATABASE_ERROR",
  NotFoundError = "NOT_FOUND_ERROR",
  ThirdPartyError = "THIRD_PARTY_ERROR",
  TooManyRequests = "TOO_MANY_REQUESTS",
  UnknownError = "UNKNOWN_ERROR"
}

export interface ApiErrorResponse<C = unknown> {
  /** Api response code */
  statusCode: number;
  /** Generic error type */
  type: ErrorType;
  message: string;
  /** More specific error code, types specified from parent */
  code?: C;
  /** Extra more specific relevant information */
  param?: Record<string, unknown>;
}

/**
 * Standardised api error class
 */
export default class APIError<C> extends Error {
  public readonly type: ErrorType;
  public readonly code?: C;
  public readonly param?: Record<string, unknown>;

  constructor(msg: string, type?: ErrorType, code?: C, param?: Record<string, unknown>) {
    super(msg);
    debug.error(msg, type, code, param);
    this.type = type || ErrorType.UnknownError;
    this.code = code;
    this.param = param;
  }

  /**
   * Returns an ErrorType according to the given HTTP response statusCode
   *
   * @param statusCode - The statusCode of the HTTP response
   */
  public static httpStatusCodeToErrorType(statusCode: number): ErrorType {
    switch (statusCode) {
      case 400:
        return ErrorType.InvalidData;

      case 401:
        return ErrorType.AuthenticationError;

      case 403:
        return ErrorType.ForbiddenError;

      case 404:
        return ErrorType.NotFoundError;

      case 422:
        return ErrorType.ApiConectionError;

      case 429:
        return ErrorType.TooManyRequests;

      case 502:
        return ErrorType.ApiConectionError;

      case 500:
      default:
        return ErrorType.UnknownError;
    }
  }

  /**
   * Returns a HTTP statusCode according to the given ErrorType
   *
   * @param errorType - An ApiError ErrorType
   */
  public static errorTypeToHttpStatusCode(errorType: ErrorType): number {
    switch (errorType) {
      case ErrorType.ThirdPartyError:
      case ErrorType.ApiError:
      case ErrorType.DatabaseError:
        return 400;
        break;

      case ErrorType.AuthenticationError:
        return 401;

      case ErrorType.ForbiddenError:
        return 403;

      case ErrorType.NotFoundError:
        return 404;

      case ErrorType.InvalidData:
        return 422;

      case ErrorType.TooManyRequests:
        return 429;

      case ErrorType.ApiConectionError:
        return 502;

      // default to a 500
      case ErrorType.UnknownError:
      default:
        return 500;
    }
  }

  /**
   * Formats the given ApiError into a structured response
   *
   * @param error - The ApiError to output
   */
  public static formatApiError(error: APIError<unknown>): ApiErrorResponse {
    const statusCode = this.errorTypeToHttpStatusCode(error.type);

    return {
      statusCode,
      message: error.message,
      type: error.type,
      code: error.code,
      param: error.param
    };
  }

}
