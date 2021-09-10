import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils";

const AWS = AWSXRay.captureAWS(AWSModule);

export enum S3Level {
  public = "public", // anyone can get or put to this level
  private = "private", // private files, only readable and writable by the user
  protected = "protected", // writable only by current user but readable by all
  admin = "admin", // writable and readable only by admin users
  global = "global" // writable by admins, readable by all
}

/**
 * Create a new S3 service object
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
 * @param awsS3ConfigOverrides - Configuration option overrides
 */
export const s3Configure = (awsS3ConfigOverrides: AWS.S3.ClientConfiguration = {}): AWSModule.S3 => {
  const awsConfig = awsConfigure();

  return new AWS.S3({
    ...awsConfig,
    ...awsS3ConfigOverrides,
    signatureVersion: "v4"
  });
};