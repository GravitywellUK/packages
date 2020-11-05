import * as Joi from "@hapi/joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";

import { s3Configure } from "./s3-configure";

export interface PutS3ObjectParams {
  path: string;
  bucket: string;
  body: AWS.S3.PutObjectRequest["Body"];
  userSub?: string | null;
}

export const putObjectToS3 = async (putObjectParams: PutS3ObjectParams, configOverrides: AWS.S3.ClientConfiguration = {}) => {
  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required(),
    userSub: Joi.string().optional()
  }).unknown(true).validate(putObjectParams);

  if (error) {
    throw jsonApiError(error);
  }
  const s3 = s3Configure(configOverrides);
  let key = putObjectParams.path;

  // save to the users private directory in s3 so that only they can access it
  if (putObjectParams.userSub) {
    key = `private/${putObjectParams.userSub}/${key}`;
  }

  try {
    await s3.putObject({
      Bucket: putObjectParams.bucket,
      Key: key,
      Body: putObjectParams.body
    }).promise();

    return { key };
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "putObjectToS3"
    });
  }
};
