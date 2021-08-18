import { jsonApiError } from "@gravitywelluk/json-api-error";
import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils/aws-configure";

const AWS = AWSXRay.captureAWS(AWSModule);

export const sqsConfigure = (sqsConfig = {}) => {
  try {
    const awsConfig = awsConfigure();

    return new AWS.SQS({
      ...awsConfig,
      endpoint: process.env.AWS_SQS_LOCAL_ENDPOINT,
      ...sqsConfig
    });
  } catch (error) {
    throw jsonApiError(error);
  }
};