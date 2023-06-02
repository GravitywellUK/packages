import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils";

const AWS = AWSXRay.captureAWS(AWSModule);

AWSXRay.setContextMissingStrategy("IGNORE_ERROR");

/**
 * Creates a new AWS Lambda service object
 *
 * @param awsLambdaConfigOverrides - Configuration option overrides
 */
export const lambdaConfigure = (awsLambdaConfigOverrides: AWSModule.Lambda.ClientConfiguration = {}): AWSModule.Lambda => {
  const awsConfig = awsConfigure();

  return new AWS.Lambda({
    ...awsConfig,
    ...awsLambdaConfigOverrides,
    endpoint: process.env.AWS_LAMBDA_LOCAL_ENDPOINT,
    signatureVersion: "v4"
  });
};