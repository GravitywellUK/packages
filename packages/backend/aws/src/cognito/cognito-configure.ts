import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils/aws-configure";

const AWS = AWSXRay.captureAWS(AWSModule);

export const cognitoConfigure = (cognitoConfig = {}) => {
  const awsConfig = awsConfigure();

  return new AWS.CognitoIdentityServiceProvider({
    ...awsConfig,
    ...cognitoConfig,
    signatureVersion: "v4"
  });
};