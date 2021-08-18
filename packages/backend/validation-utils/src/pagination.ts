import Joi from "joi";

type OrderBy<TAttributes> = Array<[keyof TAttributes, "ASC" | "DESC"]>;
export interface PaginationParameterAttributes<TAttributes> {
  offset?: number;
  limit?: number;
  order?: OrderBy<TAttributes>;
}
/**
 *  validates pagination parameters
 * @param entitySchema
 */
export const getPaginationParameterSchema = (entitySchema: Record<string, Joi.Schema>): {
  offset: Joi.NumberSchema;
  limit: Joi.NumberSchema;
  order: Joi.ArraySchema;
} => ({
  offset: Joi.number().optional().default(0),
  limit: Joi.number().min(1).max(100).optional().default(100),
  order: Joi.array().items(Joi.array().items(Joi.string().valid(...Object.keys(entitySchema).concat([ "ASC", "DESC" ]))).length(2)).optional()
});
