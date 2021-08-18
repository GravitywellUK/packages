import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";
import { sesV2Configure } from "./sesv2-configure";

/**
   * gets a template by name
   *
   * @param name string
   * @returns promise with the output
   * @memberof AwsSESService
   */
export const getEmailTemplateByName = async (
  name: string,
  configOverrides: AWS.SESV2.ClientConfiguration = {}
): Promise<AWS.SESV2.GetEmailTemplateResponse> => {
  const ses = sesV2Configure(configOverrides);

  try {
    return await ses.getEmailTemplate({ TemplateName: name }).promise();
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "getEmailTemplateByName"
    });
  }
};