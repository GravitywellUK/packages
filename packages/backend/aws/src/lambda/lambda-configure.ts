import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils/aws-configure";

const AWS = AWSXRay.captureAWS(AWSModule);

export const lambdaConfigure = (lambdaConfig: AWSModule.Lambda.ClientConfiguration = {}): AWS.Lambda => {
  const awsConfig = awsConfigure();

  return new AWS.Lambda({
    ...awsConfig,
    endpoint: process.env.AWS_LAMBDA_LOCAL_ENDPOINT,
    ...lambdaConfig,
    signatureVersion: "v4"
  });
};