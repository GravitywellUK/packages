import { jsonApiError } from "@gravitywelluk/json-api-error";

import { awsError } from "../utils/aws-error";

import { sqsConfigure } from "./sqs-configure";
import { getQueueUrl } from "./get-queue-url";

export const addJobToQueue = (
  processJobId: number,
  jobData: Record<string, any>,
  userId: number | string | null,
  queueName: string,
  configOverrides = {}
): Promise<AWS.SQS.SendMessageResult> => {
  return new Promise((resolve, reject) => {
    try {
      const awsSQS = sqsConfigure(configOverrides);

      getQueueUrl(queueName, configOverrides)
        .then(queueUrl => {
          awsSQS.sendMessage({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify({
              processJobId,
              data: jobData
            }),
            MessageAttributes: {
              userId: {
                StringValue: userId ? userId.toString() : "",
                DataType: "String"
              }
            }
          },
          (error, data) => {
            if (error) {
              return reject(awsError(error, {
                environment: process.env.ENVIRONMENT,
                functionName: "addJobToQueue"
              }));
            }

            return resolve(data);
          });
        })
        .catch(error => {
          return reject(awsError(error, {
            environment: process.env.ENVIRONMENT,
            functionName: "addJobToQueue"
          }));
        });
    } catch (error) {
      return reject(jsonApiError(error));
    }
  });
};