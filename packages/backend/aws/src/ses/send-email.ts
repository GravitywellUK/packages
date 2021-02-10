import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";

import { sesV2Configure } from "./sesv2-configure";

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
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "sendEmail"
    });
  }
};