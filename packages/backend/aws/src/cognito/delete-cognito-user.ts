import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import type AWSModule from "aws-sdk";

import { awsError } from "../utils";
import { cognitoConfigure } from "./cognito-configure";

export interface DeleteCognitoUserParams {
  userPoolId: string;
  cognitoId: string;
}

/**
 * Deletes a user in Cognito
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminDeleteUser-property
 * @param deleteUserParams - The parameters required to delete a Cognito user
 * @param awsCognitoConfigOverrides - Configuration option overrides
 */
export const deleteCognitoUser = async (
  deleteUserParams: DeleteCognitoUserParams,
  awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}
): Promise<Record<string, unknown>> => {
  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    cognitoId: Joi.string().required()
  }).validate(deleteUserParams);

  // Error if there any Joi validation errors
  if (error) {
    throw jsonApiError(error);
  }
  const cognito = cognitoConfigure(awsCognitoConfigOverrides);

  // Delete the requested Cognito user
  try {
    const deleteResponse = await cognito.adminDeleteUser({
      UserPoolId: deleteUserParams.userPoolId,
      Username: deleteUserParams.cognitoId
    }).promise();

    return deleteResponse;
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "deleteCognitoUser"
    });
  }
};
