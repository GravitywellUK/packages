import { sqsConfigure } from "./sqs-configure";
import { getQueueUrl } from "./get-queue-url";
import { AwsError } from "../utils/aws-error";

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
            MessageAttributes: userId ? {
              userId: {
                StringValue: userId.toString(),
                DataType: "String"
              }
            } : undefined
          },
          (error, data) => {
            if (error) {
              return reject(new AwsError(error));
            }

            return resolve(data);
          });
        })
        .catch(error => {
          return reject(new AwsError(error));
        });
    } catch (error) {
      return reject(error);
    }
  });
};
