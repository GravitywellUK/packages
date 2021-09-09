import {
  JSONApiErrorJSON,
  ERROR_CODE_ENUM,
  jsonApiError
} from "@gravitywelluk/json-api-error";

/**
 *
 * @param error
 * @param meta
 */
export default (error: AWS.AWSError, meta?: JSONApiErrorJSON["meta"]): ReturnType<typeof jsonApiError> => {
  return jsonApiError({
    status: error.statusCode as number,
    code: ERROR_CODE_ENUM.THIRD_PARTY_ERROR,
    title: `AWS error (${error.statusCode} - ${error.code})`,
    details: error.message,
    meta
  });
};