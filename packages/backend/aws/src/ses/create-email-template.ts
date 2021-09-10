import * as AWS from "aws-sdk";

import { sesV2Configure } from "./sesv2-configure";
import { AwsError } from "../utils/aws-error";

/**
   * Creates a template
   *
   * @param fileName string
   * @param body any
   * @returns promise with the output
   * @memberof AwsSESService
   */
export const createEmailTemplate = async (
  createTemplateParams: AWS.SESV2.CreateEmailTemplateRequest,
  configOverrides: AWS.SESV2.ClientConfiguration = {}
): Promise<AWS.SESV2.CreateEmailTemplateResponse> => {
  const ses = sesV2Configure(configOverrides);

  try {
    return await ses.createEmailTemplate(createTemplateParams).promise();
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
