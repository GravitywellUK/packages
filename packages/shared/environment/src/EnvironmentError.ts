import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

export enum EnvironmentErrorCode {
  MissingVariables = "missing_variables",
  MissingAWSSecrets = "missing_aws_secrets"
}

/**
 * Environment Error class
 *
 * Custom APIError for an Environment error.
 */
export class EnvironmentError extends APIError<EnvironmentErrorCode> {
  constructor(msg: string, type?: ErrorType, code?: EnvironmentErrorCode, param?: Record<string, unknown>) {
    super(msg, type, code, param);
  }
}