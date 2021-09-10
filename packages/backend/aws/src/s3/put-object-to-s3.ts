import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import type AWSModule from "aws-sdk";

import { awsError } from "../utils";
import { s3Configure } from "./s3-configure";

export interface PutS3ObjectParams {
  bucket: string;
  path: string;
  body: AWSModule.S3.PutObjectRequest["Body"];
  userSub?: string | null;
}

/**
 * Puts an object from AWS S3
 *
 * @param putObjectParams - The parameters required to put an object into S3
 * @param awsS3ConfigOverrides - Configuration option overrides
 */
export const putObjectToS3 = async (
  putObjectParams: PutS3ObjectParams,
  awsS3ConfigOverrides: AWSModule.S3.ClientConfiguration = {}
): Promise<AWSModule.S3.PutObjectOutput> => {
  const s3 = s3Configure(awsS3ConfigOverrides);

  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required(),
    userSub: Joi.string().optional()
  }).unknown(true).validate(putObjectParams);

  let key = "";

  // Error if there any Joi validation errors
  if (error) {
    throw jsonApiError(error);
  }

  key = putObjectParams.path;

  // Save to the users private directory in S3 so that only they can access it
  if (putObjectParams.userSub) {
    key = `private/${putObjectParams.userSub}/${key}`;
  }

  try {
    return await s3.putObject({
      Bucket: putObjectParams.bucket,
      Key: key,
      Body: putObjectParams.body
    }).promise();
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "putObjectToS3"
    });
  }
};
