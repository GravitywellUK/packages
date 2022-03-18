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
  PaymentRequired = "PAYMENT_REQUIRED",
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

  /**
   * Returns a HTTP statusCode according to the given ErrorType
   *
   * @param errorType - An ApiError ErrorType
   */
  protected static errorTypeToHttpStatusCode(errorType: ErrorType): number {
    switch (errorType) {
      case ErrorType.ThirdPartyError:
      case ErrorType.ApiError:
      case ErrorType.DatabaseError:
        return 400;

      case ErrorType.AuthenticationError:
        return 401;

      case ErrorType.PaymentRequired:
        return 402;

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

      case ErrorType.UnknownError:
      default:
        return 500;
    }
  }
}
