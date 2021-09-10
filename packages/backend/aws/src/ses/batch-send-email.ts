import * as AWS from "aws-sdk";

import { sesV2Configure } from "./sesv2-configure";
import { AwsError } from "../utils/aws-error";

/**
   * Send a templated email in batch to users
   *
   * @param {string} template
   * @param {Array<{ name: string; email: string }>} toAddresses
   * @param {TemplateData} data
   * @returns {Promise<AWS.SES.SendBulkTemplatedEmailResponse>}
   * @memberof AwsSESService
   */
export const batchSendEmail = async (
  sendBulkParams: AWS.SESV2.SendBulkEmailRequest,
  configOverrides: AWS.SESV2.ClientConfiguration = {}
): Promise<AWS.SESV2.SendBulkEmailResponse> => {
  const ses = sesV2Configure(configOverrides);

  try {
    return await ses.sendBulkEmail(sendBulkParams).promise();
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
