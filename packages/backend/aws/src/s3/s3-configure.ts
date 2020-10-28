import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils/aws-configure";

const AWS = AWSXRay.captureAWS(AWSModule);

export enum S3Level {
  public = "public", // anyone can get or put to this level
  private = "private", // private files, only readable and writable by the user
  protected = "protected", // writable only by current user but readable by all
  admin = "admin", // writable and readable only by admin users
  global = "global" // writable by admins, readable by all
}
export const s3Configure = (s3Config: AWS.S3.ClientConfiguration = {}) => {
  const awsConfig = awsConfigure();

  return new AWS.S3({
    ...awsConfig,
    ...s3Config
  });
};