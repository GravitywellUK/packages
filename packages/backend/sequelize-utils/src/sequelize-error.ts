import * as Sequelize from "sequelize/types";
import {
  JSONApiErrorStatic, jsonApiError, ERROR_CODE_ENUM, JSONApiErrorJSON
} from "@gravitywelluk/json-api-error";

interface SequelizeBaseError extends Sequelize.BaseError { details?: string }
/**
 * Custom error handler for sequelize
 *
 * Creates a JSON API error response from any sequelize error
 *
 * @param err - An Error
 */
export const sequelizeError = (err: SequelizeBaseError | Sequelize.UniqueConstraintError | JSONApiErrorStatic, entityName?: string): JSONApiErrorStatic => {
  let errMsg = "";

  // If already a JSONApi error, just return it.
  if (JSONApiErrorStatic.isJSONApiError(err)) {
    return err as JSONApiErrorStatic;
  }

  // Handle the error according to their type
  switch (err.name) {
    case "SequelizeUniqueConstraintError": {
      const valErr = err as Sequelize.UniqueConstraintError;
      const source: JSONApiErrorJSON["source"] = { stack: err.stack };

      // For each validation item in the errors array, output accordantly
      valErr.errors.map(err => {
        errMsg += `A record with the value of "${err.value}" already exists for "${err.value}". \n`;
        source.pointer += `${err.path} |`;
      });

      return jsonApiError({
        code: ERROR_CODE_ENUM.DATABASE_ERROR,
        status: 409,
        title: `${entityName} conflicts`,
        details: errMsg,
        source
      });
    }
    case "SequelizeEmptyResultError": {
      const valErr: Sequelize.EmptyResultError = err;

      return jsonApiError({
        code: ERROR_CODE_ENUM.NOT_FOUND_ERROR,
        status: 404,
        title: `${entityName || "Entity"} not found`,
        details: valErr.message,
        source: { stack: err.stack }
      });
    }

    default:
      return jsonApiError({
        code: ERROR_CODE_ENUM.DATABASE_ERROR,
        status: 500,
        title: err.name,
        details: (err as SequelizeBaseError).details ? (err as SequelizeBaseError).details as string : err.message,
        source: { stack: err.stack }
      });
  }
};
