import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { APIVersions } from "aws-sdk/lib/config";

const AWS = AWSXRay.captureAWS(AWSModule);

/**
 * Create a new AWS Configuration object
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
 * @param awsConfigOverrides - Configuration option overrides
 */
export default (awsConfigOverrides: AWSModule.ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions = {}): AWSModule.Config => {
  return new AWS.Config({
    region: process.env.REGION,
    ...awsConfigOverrides
  });
};