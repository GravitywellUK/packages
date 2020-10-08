import {

  JSONApiMeta, JSONApiErrorJSON, jsonApiError, ERROR_CODE_ENUM
} from "@gravitywelluk/json-api-error";
import {
  APIGatewayProxyResult,
  Context
} from "aws-lambda";

import { CustomAPIGatewayProxyEvent } from "./gateway-proxy-handler";

/**
   * Send a JSON API response in the form of a APIGatewayProxyResult
   *
   * @param event An AWS API Gateway proxy event object
   * @param event An AWS API Gateway proxy event object
   * @param data A JSON API response object
   */
export const buildApiResponse = (
  event: CustomAPIGatewayProxyEvent, context: Context, data: JSONApiResponseObject | ReturnType<typeof jsonApiError>
): APIGatewayProxyResult => {
  let resp: JSONApiResponse;
  let meta: JSONApiMeta;

  // If there is an error, send an error response
  if (!data || data.status >= 400 || !data.status) {
    meta = {
      environment: event.requestContext.stage,
      resource: event.requestContext.resourcePath,
      httpMethod: event.requestContext.httpMethod,
      functionName: context.functionName
    };
    // Prepare error response
    resp = prepareErrorResponse(data, meta);
  } else {
    // Prepare OK response
    resp = prepareOkResponse(data);
  }

  // Set the JSON response
  return {
    statusCode: resp.status,
    headers: {
      "Content-Type": "application/vnd.api+json",
      "Access-Control-Allow-Origin": event.headers ? event.headers.origin : "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(resp)
  };
};

/**
   * Sends an OK JSON API response with the given data object
   *
   * @param JSONApi Response
   */
const prepareOkResponse = (jsonApiObj: JSONApiResponseObject): JSONApiResponse => {
  return {
    status: jsonApiObj.status,
    data: jsonApiObj.data
  };
};

/**
   * Sends an JSON API error response with the given data object
   */
const prepareErrorResponse = (jsonApiObj: JSONApiResponseObject,
  meta: JSONApiMeta): JSONApiResponse => {
  let responseError: Partial<JSONApiErrorJSON> = { };

  if (!jsonApiObj) {
    responseError = jsonApiError({
      status: 500,
      title: "Unknown Error",
      details: "An unknown error occurred",
      code: ERROR_CODE_ENUM.UNKNOWN_ERROR
    }).toJson();
  }

  responseError = jsonApiError(jsonApiObj as ReturnType<typeof jsonApiError>).toJson();

  return {
    meta,
    status: responseError.status || 500,
    errors: [ responseError as JSONApiErrorJSON ]
  };
};

export interface JSONApiResponseObject<T = unknown> extends Partial<JSONApiErrorJSON> {
  status: number;
  data?: T;
}

export interface JSONApiResponse<T = unknown> {
  status: number;
  meta?: JSONApiMeta;
  data?: T;
  errors?: JSONApiErrorJSON[];
}
