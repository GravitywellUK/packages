import * as stream from "stream";

import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import * as AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

import { awsError } from "../utils/aws-error";

import { s3Configure } from "./s3-configure";

export interface GetS3ObjectParams {
  path: string;
  bucket: string;
  stream?: boolean;
}

export interface GetS3ObjectParamsWithStream extends GetS3ObjectParams {
  /** defaults to not be a stream */
  stream: true;
}
// type dependant on stream parameter
async function getObjectFromS3(getObjectParams: GetS3ObjectParamsWithStream, configOverrides?: AWS.S3.ClientConfiguration): Promise<stream.Readable>;
async function getObjectFromS3(getObjectParams: GetS3ObjectParams, configOverrides?: AWS.S3.ClientConfiguration): Promise<PromiseResult<AWS.S3.GetObjectOutput, AWS.AWSError>>;

async function getObjectFromS3(getObjectParams: any, configOverrides = {}) {
  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required(),
    stream: Joi.boolean().optional()
  }).unknown(true).validate(getObjectParams);

  if (error) {
    throw jsonApiError(error);
  }

  const s3 = s3Configure({
    ...configOverrides,
    region: process.env.REGION
  });

  // return the s3 file as a stream
  if (getObjectParams.stream === true) {
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
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "getObjectFromS3"
    });
  }
}

export { getObjectFromS3 };