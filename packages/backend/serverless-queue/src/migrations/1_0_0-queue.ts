import { DataTypes, QueryInterface } from "sequelize";
import { $enum } from "ts-enum-util";

import { QueueErrorStatus } from "../models/queue-error";
import { QueueJobStatus } from "../models/queue-job";

export async function up(params: { context: QueryInterface }): Promise<void> {
  const queryInterface: QueryInterface = params.context;

  console.log($enum(QueueJobStatus).getValues());

  await queryInterface.createTable("queueJob", {
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
      allowNull: true
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
  });

  await queryInterface.createTable("queueError", {
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
      type: DataTypes.STRING("medium"),
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
  });
}

export async function down(params: { context: QueryInterface }): Promise<void> {
  const queryInterface: QueryInterface = params.context;

  await queryInterface.dropTable("queueError");

  return await queryInterface.dropTable("queueJob");
}