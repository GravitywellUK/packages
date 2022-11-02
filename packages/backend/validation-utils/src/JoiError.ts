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
export default class JoiError extends APIError {

  constructor(err: Joi.ValidationError) {
    const context = { details: err.details };

    super(err.message, ErrorType.UnprocessableEntity, context);
  }

}
