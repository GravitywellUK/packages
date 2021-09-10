import { sqsConfigure } from "./sqs-configure";
import { AwsError } from "../utils/aws-error";

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
          return reject(new AwsError(error));
        }

        return resolve(data.QueueUrl || "");
      });
    } catch (error) {
      return reject(error);
    }
  });
};
