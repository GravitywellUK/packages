import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";

import { sesV2Configure } from "./sesv2-configure";

/**
   * Updates a template
   *
   * @param fileName string
   * @param body any
   * @returns promise with the output
   * @memberof AwsSESService
   */
export const updateEmailTemplate = async (
  updateEmailParams: AWS.SESV2.UpdateEmailTemplateRequest,
  configOverrides: AWS.SESV2.ClientConfiguration = {}
): Promise<AWS.SESV2.UpdateEmailTemplateResponse> => {
  const ses = sesV2Configure(configOverrides);

  try {
    return await ses.updateEmailTemplate(updateEmailParams).promise();
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "updateEmailTemplate"
    });
  }
};