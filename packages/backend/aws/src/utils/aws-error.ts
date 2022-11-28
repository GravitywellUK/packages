import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";
import * as AWS from "aws-sdk";

/**
 * Aws error class extension
 *
 * @param error
 * @param meta
 */
export class AwsError extends APIError {

  constructor(err: AWS.AWSError) {
    const context = {
      region: err.region,
      requestId: err.requestId

    };

    super(err.message, ErrorType.BadRequest, context);
  }

}
