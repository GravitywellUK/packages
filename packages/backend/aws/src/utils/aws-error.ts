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
export class AwsError extends APIError<string> {

  constructor(err: AWS.AWSError) {
    const param = {
      region: err.region,
      requestId: err.requestId

    };

    super(err.message, ErrorType.ThirdPartyError, err.code, param);
  }

}
