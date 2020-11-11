import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";

import { awsError } from "../utils/aws-error";

import { cognitoConfigure } from "./cognito-configure";
// import { jsonApiError, ERROR_CODE_ENUM } from "@gravitywelluk/json-api-error";
// import { CognitoIdentityServiceProvider } from "aws-sdk";

export interface DeleteCognitoUserParams {
  userPoolId: string;
  cognitoId: string;
}

export const deleteCognitoUser = async (deleteUserParams: DeleteCognitoUserParams, configOverrides = {}) => {
  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    cognitoId: Joi.string().required()
  }).validate(deleteUserParams);

  if (error) {
    throw jsonApiError(error);
  }
  const cognito = cognitoConfigure(configOverrides);

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
