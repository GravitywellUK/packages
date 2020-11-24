import * as Sentry from "@sentry/node";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import { createDebug } from "@gravitywelluk/debug";

import {
  QueueJobAttributes, QueueJobStatus, QueueModels
} from "../models/queue-job";

const debug = createDebug("PROCESS-JOBS:PROCESS-JOB");

export type AvailableQueueJobStatus = QueueJobStatus.SUCCESS | QueueJobStatus.ERROR;

export interface JobResult<ResultData = any> {
  status: AvailableQueueJobStatus;
  statusMessage?: string;
  jobResultData?: AvailableQueueJobStatus extends QueueJobStatus.SUCCESS ? ResultData : null;
  // errorData?: AvailableQueueJobStatus extends QueueJobStatus.ERROR ? ErrorData : null;
}

/**
 * process a job from the queue
 *
 * @static
 * @param {KinesisJobData} job
 * @memberof QueueJobService
 */
export const processJob = async <JobData extends { queueJobId: number }, ResultData = any, M extends QueueModels = QueueModels>(models: M, jobData: JobData, job: (queueJob: QueueJobAttributes) => Promise<JobResult<ResultData>>): Promise<QueueJobAttributes> => {
  let queueJob;
  let jobResult: JobResult<ResultData> | undefined;
  const { queueJobId } = jobData;

  try {
    debug.info(`Queue job started (internal id ${queueJobId})`);
    const { QueueJob } = models;

    queueJob = await QueueJob.findById(queueJobId);
  } catch (error) {
    throw jsonApiError(error);
  }

  // Start the queue job job.
  try {
    await startedQueueJob(queueJob.get("id") as number, models);
  } catch (error) {
    const message = `Could not start job: ${error.details || "Unkown error"}`;

    return await finishedQueueJob(queueJob.get("id"), {
      status: QueueJobStatus.ERROR,
      statusMessage: message
    }, models);
  }

  try {
    jobResult = await job(queueJob.get());
  } catch (error) {
    let message = "Could not complete job";

    message += error.details ? `: ${error.details}` : "";

    return await finishedQueueJob(queueJob.get("id"), {
      status: QueueJobStatus.ERROR,
      statusMessage: message
    }, models);
  }

  return await finishedQueueJob<AvailableQueueJobStatus>(queueJob.get("id"), jobResult || {
    status: QueueJobStatus.ERROR,
    statusMessage: "Unknown error occurred"
  }, models);
};

/**
 * Set a queue job as "started".
 *
 * @param queue jobId - The queue job id.
 * @return - The queue job object.
 */
const startedQueueJob = async <M extends QueueModels = QueueModels>(queuejobId: number, models: M): Promise<QueueJobAttributes> => {
  try {
    const { QueueJob } = models;
    const queueJob = await QueueJob.findById(queuejobId);

    queueJob.set("startedAt", new Date());
    queueJob.set("status", QueueJobStatus.IN_PROGRESS);
    await queueJob.save();
    debug.info(`Started queue job job with internal id: ${queuejobId}`);

    return queueJob.get({ plain: true });
  } catch (error) {
    throw jsonApiError(error);
  }
};

/**
 * Set a queue job as "finished".
 *
 * @param queue jobId - The queue job id.
 * @return - The queue job object.
 */
const finishedQueueJob = async <FinishedStatusType extends AvailableQueueJobStatus, M extends QueueModels = QueueModels>(
  queuejobId: number,
  jobResult: JobResult<FinishedStatusType>,
  models: M
): Promise<QueueJobAttributes> => {
  try {
    const { QueueJob } = models;
    const queueJob = await QueueJob.findById(queuejobId);

    queueJob.set("finishedAt", new Date());
    queueJob.set("status", jobResult.status);

    if (jobResult.jobResultData) {
      queueJob.set("jobData", jobResult.jobResultData);
    }
    // else if (jobResult.errorData) {
    //   // queueJob.set("errorData", jobResult.errorData);
    // }

    if (jobResult.statusMessage) {
      queueJob.set("statusMessage", jobResult.statusMessage);
    }

    await queueJob.save();
    debug.info(`Finished queue job job with internal id: ${queuejobId}. Status: ${jobResult.status}`);

    const jobAttributes = queueJob.get({ plain: true });

    // Capture errored queue job jobs in Sentry.
    if (jobAttributes.status === QueueJobStatus.ERROR) {
      Sentry.captureMessage("Errored queue job job", {
        level: Sentry.Severity.Error,
        contexts: { data: { "queue job-job": "finished-queue job-job" } },
        extra: {
          queuejobId,
          jobResult
        }
      });
    }

    return jobAttributes;
  } catch (error) {
    throw jsonApiError(error);
  }
};