import Joi from "joi";
import {
  jsonApiError,
  ERROR_CODE_ENUM
} from "@gravitywelluk/json-api-error";
import * as R from "ramda";

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
    throw jsonApiError({
      status: 400,
      title: "Invalid request body",
      details: "Request body could not be formatted!",
      code: ERROR_CODE_ENUM.INVALID_DATA_ERROR
    });
  }

  const { error, value } = Joi.object(validation).validate(result);

  if (error) {
    throw jsonApiError({
      status: 400,
      title: "Invalid request body",
      details: error.message,
      code: ERROR_CODE_ENUM.INVALID_DATA_ERROR,
      source: { pointer: R.join("|", R.map(detail => detail.path, error.details)) }
    });
  }

  return value;
};
