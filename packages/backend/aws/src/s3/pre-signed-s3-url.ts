import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import { $enum } from "ts-enum-util";
import type AWSModule from "aws-sdk";

import { awsError } from "../utils";
import {
  s3Configure,
  S3Level
} from "./s3-configure";

export interface GetSignedS3UrlParams {
  path: string;
  bucket: string;
  operation: "put" | "get";
  userSub?: string | null;
  level: S3Level;
}

/**
 * Creates a pre-signed S3 URL request to perform either a 'getObject' or 'putObject'
 *
 * @param signedUrlParams - The parameters required to get a signed S3 URL
 * @param awsS3ConfigOverrides - Configuration option overrides
 */
export const preSignedS3Url = async (
  signedUrlParams: GetSignedS3UrlParams,
  awsS3ConfigOverrides: AWSModule.S3.ClientConfiguration = {}
): Promise<{url: string; key: string; level: S3Level }> => {
  const s3 = s3Configure(awsS3ConfigOverrides);
  let key = "";

  const { error } = Joi.object({
    bucket: Joi.string().required(),
    path: Joi.string().required(),
    userSub: Joi.when("level", {
      is: S3Level.protected || S3Level.private,
      then: Joi.string().required()
    }),
    operation: Joi.string().required().allow("put", "get"),
    level: Joi.string().required().allow(...$enum(S3Level).getValues())
  }).unknown(true).validate(signedUrlParams);

  // Error if there any Joi validation errors
  if (error) {
    throw jsonApiError(error);
  }

  key = signedUrlParams.path;

  // Prefix namespacing
  if (signedUrlParams.level === S3Level.public) {
    key = `${S3Level.public}/${key}`;
  } else if (signedUrlParams.level === S3Level.admin) {
    key = `${S3Level.admin}/${key}`;
  } else if (signedUrlParams.userSub) {
    // save to the users private directory in s3 so that only they can access it
    key = `${signedUrlParams.level}/${signedUrlParams.userSub}/${key}`;
  }

  // Perform the pre-signed URL request
  try {
    const signedUrl = await s3.getSignedUrlPromise(`${signedUrlParams.operation}Object`, {
      Bucket: signedUrlParams.bucket,
      Key: key
    });

    return {
      url: signedUrl,
      key,
      level: signedUrlParams.level
    };
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "getSignedS3Url"
    });
  }
};
