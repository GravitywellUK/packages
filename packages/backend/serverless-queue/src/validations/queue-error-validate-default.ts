import Joi from "joi";
import * as R from "ramda";
import { PaginationParameterAttributes, getPaginationParameterSchema } from "@gravitywelluk/validation-utils";
import { $enum } from "ts-enum-util";

import { QueueErrorAttributes, QueueErrorStatus } from "../models/queue-error";

export type QueueErrorDefaultSchemaAttributes =
  QueueErrorAttributes &
  PaginationParameterAttributes<QueueErrorAttributes> &
  QueueErrorFilters;

export const queueErrorSchemaDefault = {
  id: Joi.number().required(),
  line: Joi.number().optional(),
  message: Joi.string().required(),
  status: Joi.string().allow(...$enum(QueueErrorStatus).getValues()),
  data: Joi.object().optional().unknown(true),
  jobId: Joi.number().required()
};

export type QueueErrorFilters = { filters?: Pick<QueueErrorAttributes, "id" | "status" | "line" | "message"> };

// Convert fields to optional when filtering.
export const queueErrorSchemaFilters = {
  filters: Joi.object({
    ...R.mapObjIndexed(joiElement => joiElement.optional(), queueErrorSchemaDefault),
    jobId: Joi.number().required(),
    status: Joi.string().allow(...$enum(QueueErrorStatus).getValues()),
    line: Joi.number().optional(),
    message: Joi.string().optional()
  })
};

/**
 * QueueError validation default schema
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const queueErrorValidationDefaultSchema = <P extends keyof QueueErrorDefaultSchemaAttributes>(keys: P[]) => {
  return R.pick(keys, {
    ...queueErrorSchemaDefault,
    ...queueErrorSchemaFilters,
    ...getPaginationParameterSchema(queueErrorSchemaDefault)
  });
};
