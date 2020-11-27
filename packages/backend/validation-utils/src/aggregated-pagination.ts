import Joi from "joi";

export interface UserAgggregatedEntitiesPagination {
  offset?: number;
  limit?: number;
}

export const userAgggregatedEntitiesSchema = {
  offset: Joi.number().optional().default(0),
  limit: Joi.number().min(1).max(100).optional().default(3)
};
