import * as AWS from "aws-sdk";

import { sesV2Configure } from "./sesv2-configure";
import { AwsError } from "../utils/aws-error";

/**
   * sends a templated email
   *
   * @param fileName string
   * @param body any
   * @returns promise with the output
   * @memberof AwsSESService
   */
export const sendEmail = async (
  sendEmailParams: AWS.SESV2.SendEmailRequest,
  configOverrides: AWS.SESV2.ClientConfiguration = {}
): Promise<AWS.SESV2.SendEmailResponse> => {
  const ses = sesV2Configure(configOverrides);

  try {
    return await ses.sendEmail(sendEmailParams).promise();
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
