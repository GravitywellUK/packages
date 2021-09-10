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
   * Helper function to format an error into an API response
   *
   * @param error
   * @returns
   */
  public static formatApiError(error: APIError<unknown>): ApiErrorResponse {
    let statusCode = 500;

    // work out the status code from the error type
    switch (error.type) {
      case ErrorType.NotFoundError:
        statusCode = 404;
        break;
      case ErrorType.ForbiddenError:
        statusCode = 403;
        break;
      case ErrorType.AuthenticationError:
        statusCode = 401;
        break;

      case ErrorType.ApiConectionError:
        statusCode = 502;
        break;

      case ErrorType.InvalidData:
        statusCode = 422;
        break;

      case ErrorType.ThirdPartyError:
      case ErrorType.ApiError:
      case ErrorType.DatabaseError:
        statusCode = 400;
        break;

      // default to a 500
      case ErrorType.UnknownError:
      default:
        statusCode = 500;
        break;
    }

    return {
      statusCode,
      message: error.message,
      type: error.type,
      code: error.code,
      param: error.param
    };
  }

}
