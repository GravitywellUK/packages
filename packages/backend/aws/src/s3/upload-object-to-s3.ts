import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import type AWSModule from "aws-sdk";

import { awsError } from "../utils";
import { s3Configure } from "./s3-configure";

export interface UploadS3ObjectParams {
  path: string;
  bucket: string;
  body: AWSModule.S3.PutObjectRequest["Body"];
  userSub?: string | null;
}

/**
 * Uploads an arbitrarily sized buffer, blob, or stream to S3, using intelligent
 * concurrent handling of parts if the payload is large enough
 *
 * @param uploadObjectParams - The parameters required to perform an upload to S3
 * @param awsS3ConfigOverrides - Configuration option overrides
 */
export const uploadObjectToS3 = async (
  uploadObjectParams: UploadS3ObjectParams,
  awsS3ConfigOverrides: AWSModule.S3.ClientConfiguration = {}
): Promise<AWSModule.S3.ManagedUpload.SendData> => {
  const s3 = s3Configure(awsS3ConfigOverrides);

  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required()
  }).unknown(true).validate(uploadObjectParams);

  let key = "";

  // Error if there any Joi validation errors
  if (error) {
    throw jsonApiError(error);
  }

  key = uploadObjectParams.path;

  // save to the users private directory in s3 so that only they can access it
  if (uploadObjectParams.userSub) {
    key = `private/${uploadObjectParams.userSub}/${key}`;
  }

  try {
    return await s3.upload({
      Bucket: uploadObjectParams.bucket,
      Key: key,
      Body: uploadObjectParams.body
    }).promise();
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "uploadObjectToS3"
    });
  }
};
