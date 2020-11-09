import * as uuid from "uuid";
import * as Joi from "joi";
import * as R from "ramda";
import * as Sentry from "@sentry/node";

export const jsonAPIErrorJoiSchema = Joi.object<JSONApiErrorJSON>({
  id: Joi.string().optional(),
  title: Joi.string().required(),
  details: Joi.string().required(),
  status: Joi.number().required(),
  code: Joi.string().valid(
    "API_CONNECTION_ERROR",
    "AUTHENTICATION_ERROR",
    "INVALID_DATA_ERROR",
    "DATABASE_ERROR",
    "NOT_FOUND_ERROR",
    "THIRD_PARTY_ERROR",
    "UNKNOWN_ERROR"
  ),
  source: Joi.object({
    pointer: Joi.string().optional(),
    parameter: Joi.string().optional(),
    stack: Joi.string().optional()
  }).optional(),
  meta: Joi.object({
    environment: Joi.string().optional(),
    resource: Joi.string().optional(),
    url: Joi.string().optional(),
    httpMethod: Joi.string().optional(),
    functionName: Joi.string().optional()
  }).optional()
});

export class JSONApiErrorStatic extends Error {
  id?: string; // a unique identifier for this particular occurrence of the problem.
  title!: string; // a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
  // a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
  status!: number; //the HTTP status code applicable to this problem, expressed as a string value.
  //the HTTP status code applicable to this problem, expressed as a string value.
  code!: ERROR_CODE_ENUM; // an application-specific error code, expressed as a string value.
  // an application-specific error code, expressed as a string value.
  /**  an object containing references to the source of the error, optionally including any of the following members: */
  source?: {
    /* a JSON Pointer [RFC6901] to the value in the request document that caused the error [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute]. This MUST point to a value in the request document that exists; if it doesn’t, the client SHOULD simply ignore the pointer. **/
    pointer?: string;
    parameter?: string; // a string indicating which URI query parameter caused the error.
    stack?: string;
  };
  meta?: JSONApiMeta; // a meta object containing non-standard meta-information about the error.

  /**
   * Check if a plain object/ variable meets the JSONApiError compliance.
   *
   * @param error: the error object to check.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isJSONApiError(error: Record<string, any>): boolean {
    const { error: joiError } = jsonAPIErrorJoiSchema.validate(error);

    return joiError ? false : true;
  }

  constructor(error: JSONApiErrorJSON | Joi.ValidationError | Partial<Error> | undefined) {
    super(error ? (error as JSONApiErrorJSON).details || (error as Error).message || "Unknown error" : "Unknown error");

    let exceptionErr: Error;

    if (!error) {
      this.id = uuid.v1(),
      this.status = 500,
      this.code = ERROR_CODE_ENUM.UNKNOWN_ERROR,
      this.title = "Unknown error";

      return;
    }

    if (error instanceof JSONApiErrorStatic || JSONApiErrorStatic.isJSONApiError(error)) {
      // If the error is a JSONApiResponse
      if (!this.id) {
        this.id = uuid.v1();

        // assign it to this error and return
        for (const item in error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this[ item ] = error[ item ];
        }
      }
    } else if (error instanceof Joi.ValidationError) {
      this.id = uuid.v1();
      this.status = 400;
      this.title = "Validation error";
      this.message = error.message;
      this.code = ERROR_CODE_ENUM.INVALID_DATA_ERROR;
      this.source = { pointer: R.join("|", R.map(detail => detail.path, error.details)) };

      return;
    } else if (error instanceof Error) {
      exceptionErr = error;
      this.id = uuid.v1();
      this.status = 500;
      this.code = ERROR_CODE_ENUM.API_ERROR;
      this.title = exceptionErr.name;
    } else if (error) {
      const jsonError = error as Partial<JSONApiErrorJSON>;

      this.id = jsonError.id || uuid.v1() ;
      this.status = jsonError.status || 500;
      this.code = jsonError.code || ERROR_CODE_ENUM.UNKNOWN_ERROR;
      this.title = jsonError.title || "Unknown error";
    } else {
      this.id = uuid.v1() ;
      this.status = 500;
      this.code = ERROR_CODE_ENUM.UNKNOWN_ERROR;
      this.title = "Unknown error";
    }

    if ([ "production", "staging" ].includes(process.env.ENVIRONMENT as string) && [
      ERROR_CODE_ENUM.UNKNOWN_ERROR,
      ERROR_CODE_ENUM.DATABASE_ERROR,
      ERROR_CODE_ENUM.THIRD_PARTY_ERROR
    ].includes(this.code)) {
      Sentry.captureEvent({
        event_id: this.id,
        level: Sentry.Severity.Error,
        extra: {
          error: {
            stack: this.stack,
            status: this.status,
            code: this.code,
            title: this.title,
            source: this.source,
            name: this.name,
            meta: this.meta
          },
          server_name: process.env.SERVICE_NAME,
          environment: process.env.ENVIRONMENT
        }
      });
    }
  }

  public toJson(): JSONApiErrorJSON {
    return {
      id: this.id,
      status: this.status,
      code: this.code,
      title: this.title,
      details: this.message,
      meta: this.meta,
      source: this.source
    };
  }
}

/**
 * Creates and API
 *
 * Creates a JSON API error response
 *
 * @see http://jsonapi.org/
 * @param error - The suppose JSON API error object
 * @return A JSON API Response containing our error(s)
 */
export const jsonApiError = (errorInfo: JSONApiErrorJSON | Joi.ValidationError | Error | undefined): JSONApiErrorStatic => {
  return new JSONApiErrorStatic(errorInfo);
};

// https://jsonapi.org/format/1.1/#document-meta
export interface JSONApiMeta {
  environment?: string;
  resource?: string;
  url?: string;
  httpMethod?: string;
  functionName?: string;
}

// allowed error codes
export enum ERROR_CODE_ENUM {
  API_ERROR = "API_ERROR",
  API_CONNECTION_ERROR = "API_CONNECTION_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  INVALID_DATA_ERROR = "INVALID_DATA_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  THIRD_PARTY_ERROR = "THIRD_PARTY_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

// https://jsonapi.org/format/1.1/#error-objects
export interface JSONApiErrorJSON {
  id?: string; // a unique identifier for this particular occurrence of the problem.
  title: string; // a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
  details: string; // a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
  status: number; //the HTTP status code applicable to this problem, expressed as a string value.
  code: ERROR_CODE_ENUM; // an application-specific error code, expressed as a string value.
  /**  an object containing references to the source of the error, optionally including any of the following members: */
  source?: {
    /* a JSON Pointer [RFC6901] to the value in the request document that caused the error [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute]. This MUST point to a value in the request document that exists; if it doesn’t, the client SHOULD simply ignore the pointer. **/
    pointer?: string;
    parameter?: string; // a string indicating which URI query parameter caused the error.
    stack?: string;
  };
  meta?: JSONApiMeta; // a meta object containing non-standard meta-information about the error.
}
