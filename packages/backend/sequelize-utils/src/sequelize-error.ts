import * as Sequelize from "sequelize/types";
import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

export enum SequelizeErrorCode {
  UniqueConstraintError = "unique_constraint"
}

/**
 * Custom error class for sequelize
 *
 * Creates an error response from any sequelize error in our error format
 *
 * @param err - An Error of some type from sequelize
 * @param entityName - the name of the model the error relates to if applicable
 */
export default class SequelizeError extends APIError<SequelizeErrorCode> {

  constructor(err: Sequelize.BaseError | Sequelize.UniqueConstraintError, entityName?: string) {
    let code;
    let param: Record<string, unknown> = {};
    let type;

    if (entityName) {
      param.entity = entityName;
    }

    if (err instanceof Sequelize.UniqueConstraintError) {
      param = Object.assign(param, err.fields);
      code = SequelizeErrorCode.UniqueConstraintError;
    } else if (err instanceof Sequelize.EmptyResultError) {
      type = ErrorType.NotFoundError;
    }

    super(err.message, type || ErrorType.DatabaseError, code);
  }

}
