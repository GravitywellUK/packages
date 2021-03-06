import Joi from "joi";
import { jsonApiError, ERROR_CODE_ENUM } from "@gravitywelluk/json-api-error";
import * as R from "ramda";

type CheckEventParams = <
  T extends Record<string, any>,
  S extends Record<string, Joi.AnySchema> = {[K in keyof T]: Joi.AnySchema},
  R = {[F in keyof S]: F extends keyof T ? T[F] extends null | undefined ? never : T[F] : never }
>(params: T | undefined, validation: S) => R;

/**
 * Takes an aws gateway proxy event and returns the valid path or query string parameters
 *
 * @param event - aws event
 * @param  validation - Joi validation schema
 * @returns response object
 */
export const checkEventParams: CheckEventParams = (params, validation) => {
  const parsed: {[name: string]: string | number | symbol } = {};

  if (params) {
    // Parse event params as json
    for (const key in params) {
      try {
        if (params[ key ]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          parsed[ key ] = JSON.parse(params[ key ]);
        }
      } catch {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        parsed[ key ] = params[ key ];
      }
    }
  }

  // Validate params
  const { error, value } = Joi.object(validation).validate(parsed, { stripUnknown: true });

  // Throw error if validation fails
  if (error) {
    throw jsonApiError({
      status: 400,
      title: "Invalid request parameters",
      details: error.message,
      code: ERROR_CODE_ENUM.INVALID_DATA_ERROR,
      source: { pointer: R.join("|", R.map(detail => detail.path, error.details)) }
    });
  }

  return value;
};