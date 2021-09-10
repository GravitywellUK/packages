import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils";

const AWS = AWSXRay.captureAWS(AWSModule);

/**
 * Create a new Cognito service object
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#constructor-property
 * @param awsCognitoConfigOverrides - Configuration option overrides
 */
export const cognitoConfigure = (awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}): AWSModule.CognitoIdentityServiceProvider => {
  const awsConfig = awsConfigure();

  return new AWS.CognitoIdentityServiceProvider({
    ...awsConfig,
    ...awsCognitoConfigOverrides,
    signatureVersion: "v4"
  });
};