import AWSXRay from "aws-xray-sdk-core";
import * as AWSModule from "aws-sdk";

import { awsConfigure } from "../utils";

const AWS = AWSXRay.captureAWS(AWSModule);

export const sesConfigure = (sesConfig: AWS.SES.ClientConfiguration = {}) => {
  const awsConfig = awsConfigure(sesConfig);

  return new AWS.SES({ ...awsConfig });
};