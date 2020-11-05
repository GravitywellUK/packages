import {
  JSONApiErrorJSON, ERROR_CODE_ENUM, jsonApiError
} from "@gravitywelluk/json-api-error";

export const awsError = (error: AWS.AWSError, meta?: JSONApiErrorJSON["meta"]): ReturnType<typeof jsonApiError> => {
  return jsonApiError({
    status: error.statusCode,
    code: ERROR_CODE_ENUM.THIRD_PARTY_ERROR,
    title: `AWS error (${error.statusCode} - ${error.code})`,
    details: error.message,
    meta
  });
};