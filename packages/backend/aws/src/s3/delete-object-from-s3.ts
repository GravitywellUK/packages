import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";

import { s3Configure } from "./s3-configure";

export interface DeleteS3ObjectParams {
  key: string;
  bucket: string;
}

export const deleteObjectFromS3 = async (deleteObjectParams: DeleteS3ObjectParams, configOverrides: AWS.S3.ClientConfiguration = {}) => {
  const { error } = Joi.object({
    bucket: Joi.string().required(),
    key: Joi.string().required()
  }).unknown(true).validate(deleteObjectParams);

  if (error) {
    throw jsonApiError(error);
  }
  const s3 = s3Configure(configOverrides);

  try {
    await s3.deleteObject({
      Bucket: deleteObjectParams.bucket,
      Key: deleteObjectParams.key
    }).promise();

    return;
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "putObjectToS3"
    });
  }
};
