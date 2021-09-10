import * as AWS from "aws-sdk";

import { awsError } from "../utils";
import { sesV2Configure } from "./sesv2-configure";

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
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "batchSendEmail"
    });
  }
};
