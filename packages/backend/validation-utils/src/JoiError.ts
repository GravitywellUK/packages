import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";
import * as Joi from "joi";

/**
 * Joi error class extension
 *
 * @param error
 */
export default class AwsError extends APIError<null> {

  constructor(err: Joi.ValidationError) {
    const param = { details: err.details };

    super(err.message, ErrorType.InvalidData, null, param);
  }

}
