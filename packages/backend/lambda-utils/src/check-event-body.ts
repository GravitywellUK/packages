import Joi from "joi";
import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";
import { JoiError } from "@gravitywelluk/validation-utils";

/**
 * Takes an aws gateway proxy event and returns the valid response object
 *
 * @param event - aws event
 * @param  validation - Joi validation schema
 * @returns response object
 */
export const checkEventBody = <T extends Record<string, any>, S extends {[K: string]: Joi.AnySchema }>(body: string | null, validation: S): {[F in keyof S]: F extends keyof T ? T[F] extends null | undefined ? never : T[F] : never } => {
  let result;

  if (!body) {
    throw new Error("Event had no body!");
  }

  try {
    result = JSON.parse(body);
  } catch (error) {
    throw new APIError("Request body could not be formatted!", ErrorType.UnprocessableEntity);
  }

  const { error, value } = Joi.object(validation).validate(result);

  if (error) {
    throw new JoiError(error);
  }

  return value;
};
