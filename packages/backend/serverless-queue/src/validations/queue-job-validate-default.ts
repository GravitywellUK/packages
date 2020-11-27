import Joi from "joi";
import * as R from "ramda";
import { PaginationParameterAttributes, getPaginationParameterSchema } from "@gravitywelluk/validation-utils";
import { $enum } from "ts-enum-util";

import { QueueJobAttributes, QueueJobStatus } from "../models/queue-job";

export type QueueJobDefaultSchemaAttributes =
  QueueJobAttributes &
  PaginationParameterAttributes<QueueJobAttributes> &
  QueueJobFilters;

export const queueJobSchemaDefault = {
  id: Joi.number().required(),
  name: Joi.string().required(),
  startedAt: Joi.date().optional(),
  finishedAt: Joi.date().optional(),
  status: Joi.string().allow(...$enum(QueueJobStatus).getValues()),
  statusMessage: Joi.string().optional(),
  triggeredByUserId: Joi.number().required(),
  jobData: Joi.object().allow(null).optional(),
  externalId: Joi.string().optional(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
};

export type QueueJobFilters = { filters?: Pick<QueueJobAttributes, "name" | "status"> };

// Convert fields to optional when filtering.
export const queueJobSchemaFilters = {
  filters: Joi.object({
    ...R.mapObjIndexed(joiElement => joiElement.optional(), queueJobSchemaDefault),
    name: Joi.string().optional(),
    status: Joi.string().optional()
  })
};

/**
 * QueueJob validation default schema
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const userValidationDefaultSchema = <P extends keyof QueueJobDefaultSchemaAttributes>(keys: P[]) => {
  return R.pick(keys, {
    ...queueJobSchemaDefault,
    ...queueJobSchemaFilters,
    ...getPaginationParameterSchema(queueJobSchemaDefault)
  });
};
