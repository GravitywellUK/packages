import * as Sentry from "@sentry/node";
import { Transaction } from "sequelize";
import { addJobToQueue } from "@gravitywelluk/aws";
import { createDebug } from "@gravitywelluk/debug";
import Joi from "joi";
import { JoiError } from "@gravitywelluk/validation-utils";
import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

import {
  QueueJobAttributes,
  QueueJobAttributesCreate,
  QueueJobStatus,
  QueueModels
} from "../models/queue-job";

// At the moment, just one queue.
const debug = createDebug("QUEUE:CREATE-QUEUE-JOB");

interface CreateJobOptions<T = unknown> {
  name: string;
  data: T;
  isStarted?: boolean;
  userId: number;
}

interface JobConfig {
  transaction?: Transaction;
  validationSchema?: Joi.AnySchema;
}
/**
   * Create a queue.
   *
   * @param models - The database models to use
   * @param jobOptions - Job data
   * @param config - config options that control the behaviour of the function
   *
   * @return - The queue object.
   */
export const createQueueJob = async <M extends QueueModels = QueueModels, T = unknown>(models: M, jobOptions: CreateJobOptions<T>, config?: JobConfig): Promise<QueueJobAttributes> => {
  try {
    debug.log(`Created new queue job with name: ${jobOptions.name} and data: `, jobOptions.data);

    const queueName = process.env.QUEUE_NAME as string;
    const isStarted = jobOptions.isStarted || false;

    if (config?.validationSchema) {
      const { error } = config.validationSchema.validate(jobOptions.data);
      // At the moment, just one queue.

      if (error) {
        throw new JoiError(error);
      }
    }

    const { QueueJob } = models;
    const now = new Date();
    let job;

    const newQueueJob: QueueJobAttributesCreate = {
      name: jobOptions.name,
      status: QueueJobStatus.QUEUED,
      jobData: jobOptions.data,
      triggeredByUserId: jobOptions.userId
    };

    if (isStarted) {
      newQueueJob.startedAt = now;
    }

    const createdQueueJob = await QueueJob.create(newQueueJob, { transaction: config?.transaction });

    try {
      // This is needed to ensure subsequent saves work.
      createdQueueJob.set("id", createdQueueJob.id);

      job = await addJobToQueue(
        createdQueueJob.id,
        jobOptions.data,
        jobOptions.userId,
        queueName
      );
    } catch (error) {
      createdQueueJob.set("status", QueueJobStatus.ERROR);
      createdQueueJob.set("statusMessage", "The job couldn't be added to the Queue.");
      await createdQueueJob.save({ transaction: config?.transaction });
      throw error;
    }

    if (!job || !job.MessageId) {
      createdQueueJob.set("status", QueueJobStatus.ERROR);
      createdQueueJob.set("statusMessage", "The Queue job wasn't created correctly.");
      await createdQueueJob.save({ transaction: config?.transaction });
      throw new APIError("Could not create job for unknown reason", ErrorType.InternalServerError);
    }

    try {
      createdQueueJob.set("externalId", job.MessageId);
      debug.info(`Process job created correctly with internal id: ${createdQueueJob.get("id")} and added to Queue ${queueName} with id ${job.MessageId}`);
      await createdQueueJob.save({ transaction: config?.transaction });

      return createdQueueJob.get();
    } catch (error) {
      createdQueueJob.set("status", QueueJobStatus.ERROR);
      createdQueueJob.set("statusMessage", "There was an error attaching the job Queue id to the job");
      await createdQueueJob.save({ transaction: config?.transaction });

      return createdQueueJob.get();
    }
  } catch (error) {
    debug.error("ERROR creating new queue job: ", error);

    Sentry.captureMessage("Error creating queue job", {
      level: Sentry.Severity.Error,
      contexts: {
        data: {
          "queue-job": "create-queue-job",
          "jobInfo": jobOptions
        }
      }
    });
    throw error;
  }
};
