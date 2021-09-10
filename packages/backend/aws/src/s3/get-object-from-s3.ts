/* eslint-disable @typescript-eslint/ban-ts-comment */
import type stream from "stream";

import * as Joi from "joi";
import { PromiseResult } from "aws-sdk/lib/request";
import type AWSModule from "aws-sdk";
import { JoiError } from "@gravitywelluk/validation-utils";

import { s3Configure } from "./s3-configure";
import { AwsError } from "../utils/aws-error";

interface GetObjectFromS3 {
  (asStream: true, getObjectParams: GetS3ObjectParams, awsS3ConfigOverrides?: AWSModule.S3.ClientConfiguration): Promise<stream.Readable>;
  (asStream: false, getObjectParams: GetS3ObjectParams, awsS3ConfigOverrides?: AWSModule.S3.ClientConfiguration): Promise<PromiseResult<AWSModule.S3.GetObjectOutput, AWSModule.AWSError>>;
}

export interface GetS3ObjectParams {
  path: string;
  bucket: string;
}

/**
 * Gets an object from AWS S3
 *
 * @param asStream - Whether to return a stream
 * @param getObjectParams - The parameters required to get the object from S3
 * @param awsS3ConfigOverrides - Configuration option overrides
 */
// @ts-ignore - TSC not clever enough to work out the return types, however, this is functionally correct
export const getObjectFromS3: GetObjectFromS3 = async (asStream, getObjectParams, awsS3ConfigOverrides = {}) => {
  const s3 = s3Configure(awsS3ConfigOverrides);

  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required()
  }).unknown(true).validate(getObjectParams);

  // Error if there any Joi validation errors
  if (error) {
    throw new JoiError(error);
  }

  // Return the S3 file as a stream
  if (asStream === true) {
    return s3.getObject({
      Bucket: getObjectParams.bucket,
      Key: getObjectParams.path
    }).createReadStream();
  }

  try {
    return await s3.getObject({
      Bucket: getObjectParams.bucket,
      Key: getObjectParams.path
    }).promise();
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
