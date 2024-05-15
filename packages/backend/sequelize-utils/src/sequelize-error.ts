import * as Sequelize from "sequelize";
import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

/**
 * Custom error class for sequelize
 *
 * Creates an error response from any sequelize error in our error format
 *
 * @param err - An Error of some type from sequelize
 * @param entityName - the name of the model the error relates to if applicable
 */
export default class SequelizeError extends APIError {

  constructor(err: Sequelize.BaseError | Sequelize.UniqueConstraintError, entityName?: string) {
    let context: Record<string, unknown> = {};
    let type;

    if (entityName) {
      context.entity = entityName;
    }

    if (err instanceof Sequelize.UniqueConstraintError) {
      context = Object.assign(context, err.fields);
    } else if (err instanceof Sequelize.EmptyResultError) {
      type = ErrorType.NotFound;
    }

    super(err.message, type || ErrorType.InternalServerError, context);
  }

}
