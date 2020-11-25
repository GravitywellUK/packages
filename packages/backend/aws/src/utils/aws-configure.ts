import AWSXRay from "aws-xray-sdk-core";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = AWSXRay.captureAWS(require("aws-sdk"));

export const awsConfigure = (awsConfigOverides = {}) => {
  return new AWS.Config({
    region: process.env.REGION,
    ...awsConfigOverides
  });
};