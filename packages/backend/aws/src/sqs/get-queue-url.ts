import { jsonApiError } from "@gravitywelluk/json-api-error";

import { awsError } from "../utils/aws-error";

import { sqsConfigure } from "./sqs-configure";

/**
   * Get a queue url
   *
   * @returns {Promise<string>}
   * @memberof AwsSQSService
   */
export const getQueueUrl = (queueName: string, configOverrides = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const awsSQS = sqsConfigure(configOverrides);

      awsSQS.getQueueUrl({ QueueName: queueName }, (error, data) => {
        if (error) {
          return reject(awsError(error, {
            environment: process.env.ENVIRONMENT,
            functionName: "getQueueUrl"
          }));
        }

        // TODO: fix this type error
        return resolve(data.QueueUrl as string);
      });
    } catch (error) {
      return reject(jsonApiError(error));
    }
  });
};