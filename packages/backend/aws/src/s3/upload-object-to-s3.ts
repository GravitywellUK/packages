import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";
import { s3Configure } from "./s3-configure";

export interface UploadS3ObjectParams {
  path: string;
  bucket: string;
  body: AWS.S3.PutObjectRequest["Body"];
  userSub?: string | null;
}

export const uploadObjectToS3 = async (uploadObjectParams: UploadS3ObjectParams, configOverrides: AWS.S3.ClientConfiguration = {}) => {
  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required()
  }).unknown(true).validate(uploadObjectParams);

  if (error) {
    throw jsonApiError(error);
  }
  const s3 = s3Configure(configOverrides);
  let key = uploadObjectParams.path;

  // save to the users private directory in s3 so that only they can access it
  if (uploadObjectParams.userSub) {
    key = `private/${uploadObjectParams.userSub}/${key}`;
  }

  try {
    await s3.upload({
      Bucket: uploadObjectParams.bucket,
      Key: key,
      Body: uploadObjectParams.body
    }).promise();

    return { key };
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "uploadObjectToS3"
    });
  }
};
