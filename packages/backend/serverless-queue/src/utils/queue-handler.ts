import { SQSHandler } from "aws-lambda";
import * as R from "ramda";

import {
  QueueJobAttributes,
  QueueJobStatus,
  QueueModels
} from "../models/queue-job";
import {
  JobResult,
  processJob
} from "./process-queue-job";

export interface JobData<T extends keyof QueueJobPayloads> extends QueueJobPayloadProcessing {
  data: QueueJobPayloads[T];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueueJobPayloads {}

export type QueueProcessTypes = keyof QueueJobPayloads;

export interface QueueJobPayloadProcessing {
  processJobId: number;
}

export type JobSelection = Record<string, (jobData: QueueJobAttributes<any>) => Promise<JobResult>>;

export const queueHandler: <M extends QueueModels = QueueModels>(models: M, jobs: JobSelection) => SQSHandler = (models, jobs) => async event => {
  const records: Array<JobData<QueueProcessTypes>> = [];

  if (event.Records) {
    for (const record of event.Records) {
      try {
        records.push(JSON.parse(record.body));
      } catch (error) {
        throw new Error("Failed to parse SQS queue record body");
      }
    }
  } else {
    return;
  }

  for (const record of records) {
    // handles the full run of the process job ran

    await processJob(models, {
      data: record.data,
      queueJobId: record.processJobId
    }, async processJobObject => {
      const job = R.find(jobName => jobName === processJobObject.name, R.keys(jobs));

      if (!job) {
        return {
          status: QueueJobStatus.ERROR,
          jobResultData: null,
          statusMessage: "No job exists by that name"
        };
      }

      const result = await jobs[ job ](processJobObject);

      return result;
    });
  }
};
