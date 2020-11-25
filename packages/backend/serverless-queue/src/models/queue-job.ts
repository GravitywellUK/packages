import {
  DataTypes, Sequelize, BuildOptions
} from "sequelize";
import { Models, BaseModel } from "@gravitywelluk/sequelize-utils";
import { $enum } from "ts-enum-util";

import { QueueErrorStatic, QueueErrorAttributes } from "./queue-error";

export interface QueueJobAttributes<D = unknown> {
  id: number;
  name: string;
  startedAt?: Date | null;
  finishedAt?: Date | null;
  status: QueueJobStatus;
  statusMessage?: string | null;
  triggeredByUserId: number;
  jobData?: D | null;
  externalId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  errors?: QueueErrorAttributes[]
}

export enum QueueJobStatus {
  SUCCESS = "success",
  ERROR = "error",
  PART_ERROR = "part_error",
  QUEUED = "queued",
  IN_PROGRESS = "in_progress"
}

export interface QueueModels extends Models {
  QueueJob: QueueJobStatic,
  QueueError: QueueErrorStatic;
}

export type QueueJobAttributesCreate = Omit<QueueJobAttributes, "id" | "createdAt" | "updatedAt">;

export type QueueJobStatic = typeof QueueJobModel & {
  new (values?: QueueJobAttributes, options?: BuildOptions): QueueJobModel;
};

export class QueueJobModel extends BaseModel implements QueueJobAttributes {
  public id!: number;
  public name!: string;
  public startedAt?: Date | null;
  public finishedAt?: Date | null;
  public status!: QueueJobStatus;
  public triggeredByUserId!: number;
  public jobData?: unknown;
  public externalId?: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate<M extends QueueModels = QueueModels>(models: M): void {
    if (models[ "QueueError" ]) {
      this.hasMany(models[ "QueueError" ], { as: "errors" });
    }
  }

}

export function QueueJobFactory(sequelize: Sequelize): QueueJobStatic {
  const QueueJobModelAttributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    triggeredByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...$enum(QueueJobStatus).getValues()),
      allowNull: false
    },
    statusMessage: {
      type: DataTypes.STRING("medium"),
      allowNull: false
    },
    jobData: {
      type: DataTypes.JSON,
      allowNull: true
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  };

  QueueJobModel.init(QueueJobModelAttributes, {
    sequelize,
    modelName: "queueJob",
    tableName: "queueJob",
    timestamps: true
  });

  return QueueJobModel;
}
