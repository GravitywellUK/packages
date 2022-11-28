import {
  Model,
  FindOptions,
  Sequelize,
  BaseError
} from "sequelize";

import SequelizeError from "./sequelize-error";

export type Models = { sequelize: Sequelize };

export class BaseModel<T1 extends {} = any, T2 extends {} = any> extends Model<T1, T2> {
  public id!: number;

  public static models: Models;
  public static sequelizeConnection: Sequelize;

  public static async findById<M extends BaseModel>(
    this: { new (): M } & typeof BaseModel, id: number, options?: Pick<FindOptions, "attributes" | "include" | "transaction" | "order">
  ): Promise<M> {
    try {
      return await this.findOne({
        ...options,
        where: { id },
        rejectOnEmpty: true
      }) as M;
    } catch (error) {
      if (error instanceof BaseError) {
        throw new SequelizeError(error, this.name);
      }
      throw error;
    }
  }

  public static associate(_models: Partial<Omit<Models, "currentUser" | "sequelize">>): void {
    // empty associate
    return;
  }

  public static addDbConnection(models: Models, sequelize: Sequelize): void {
    this.models = models;
    this.sequelizeConnection = sequelize;
  }
}
