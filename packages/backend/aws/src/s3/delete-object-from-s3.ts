import * as Joi from "joi";
import type AWSModule from "aws-sdk";
import { JoiError } from "@gravitywelluk/validation-utils";

import { AwsError } from "../utils";
import { s3Configure } from "./s3-configure";

export interface DeleteS3ObjectParams {
  key: string;
  bucket: string;
}

/**
 * Deletes an object from AWS S3
 *
 * @param deleteObjectParams - The parameters required to delete the object from S3
 * @param awsS3ConfigOverrides - Configuration option overrides
 */
export const deleteObjectFromS3 = async (
  deleteObjectParams: DeleteS3ObjectParams,
  awsS3ConfigOverrides: AWSModule.S3.ClientConfiguration = {}
): Promise<AWSModule.S3.DeleteObjectOutput> => {
  const s3 = s3Configure(awsS3ConfigOverrides);

  const { error } = Joi.object({
    bucket: Joi.string().required(),
    key: Joi.string().required()
  }).unknown(true).validate(deleteObjectParams);

  // Error if there any Joi validation errors
  if (error) {
    throw new JoiError(error);
  }

  try {
    return await s3.deleteObject({
      Bucket: deleteObjectParams.bucket,
      Key: deleteObjectParams.key
    }).promise();
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
