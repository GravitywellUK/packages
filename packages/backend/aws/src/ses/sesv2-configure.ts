import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils";

const AWS = AWSXRay.captureAWS(AWSModule);

export const sesV2Configure = (sesConfig: AWS.SESV2.ClientConfiguration = {}) => {
  const awsConfig = awsConfigure(sesConfig);

  return new AWS.SESV2({ ...awsConfig });
};