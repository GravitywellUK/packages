import {
  DataTypes, Sequelize, BuildOptions
} from "sequelize";
import { BaseModel } from "@gravitywelluk/sequelize-utils";
import { $enum } from "ts-enum-util";

export interface QueueErrorAttributes<D extends unknown | null = null> {
  id: number;
  line: number;
  data: D;
  status: QueueErrorStatus;
  jobId: number;
  message: string;
}

export enum QueueErrorStatus {
  IGNORED = "ignored",
  RESOLVED = "resolved",
  ERROR = "error",
}

export type QueueErrorAttributesCreate<D extends unknown | null = null> = Omit<QueueErrorAttributes<D>, "id">;

export type QueueErrorStatic = typeof QueueErrorModel & {
  new (values?: QueueErrorAttributes, options?: BuildOptions): QueueErrorModel;
};

export class QueueErrorModel extends BaseModel implements QueueErrorAttributes {
  public id!: number;
  public line!: number;
  public status!: QueueErrorStatus;
  public data!: any;
  public jobId!: number;
  public message!: string;
}

export function QueueErrorFactory(sequelize: Sequelize): QueueErrorStatic {
  const QueueErrorModelAttributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    line: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...$enum(QueueErrorStatus).getValues()),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT({ length: "medium" }),
      allowNull: true
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "queueJob",
        key: "id"
      },
      onDelete: "restrict",
      onUpdate: "cascade"
    }
  };

  QueueErrorModel.init(QueueErrorModelAttributes, {
    sequelize,
    modelName: "queueError",
    tableName: "queueError",
    timestamps: false
  });

  return QueueErrorModel;
}
