import * as Joi from "joi";
import type AWSModule from "aws-sdk";
import { JoiError } from "@gravitywelluk/validation-utils";

import { cognitoConfigure } from "./cognito-configure";
import { AwsError } from "../utils/aws-error";
import { cognitoListGroups } from "./utils";

export interface CreateCognitoBasicUserParams {
  userPoolId: string;
  clientId: string;
  email: string;
  password: string;

  groups?: string[];
}

/**
 * Creates a basic (non-admin) user in Cognito and triggers verification code
 *
 * This kind of user will be sent a verification code to their email address or phone number
 * Entering this and then calling confirmSignUp will enable the user's account
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#signUp-property
 * @param createBasicUserParams - The parameters required to create a basic Cognito user
 * @param awsCognitoConfigOverrides - Configuration option overrides
 */
export const createCognitoBasicUser = async (
  createBasicUserParams: CreateCognitoBasicUserParams,
  awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}
): Promise<AWSModule.CognitoIdentityServiceProvider.SignUpResponse> => {
  const cognito = cognitoConfigure(awsCognitoConfigOverrides);

  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    clientId: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    groups: Joi.array().items(Joi.string().optional()).optional()
  }).validate(createBasicUserParams);

  // Error if there any Joi validation errors
  if (error) {
    throw new JoiError(error);
  }

  // If createUserParams.groups are provided, get the current Cognito groups
  // with the given user pool
  if (createBasicUserParams.groups && createBasicUserParams.groups.length > 0) {
    // Get all of the Cognito groups for the given user pool
    const allCognitoGroups = await cognitoListGroups(cognito, { UserPoolId: createBasicUserParams.userPoolId });
    // Validate that the given createUserParams.groups match the allCognitoGroups
    const { error: joiCognitoGroupsError } = Joi.array().items(Joi.string().valid(...allCognitoGroups).required()).validate(createBasicUserParams.groups);

    // Error if there any Joi validation errors regarding the given groups now
    // we have sight of the groups that can be chosen (allCognitoGroups)
    if (joiCognitoGroupsError) {
      throw new JoiError(joiCognitoGroupsError);
    }
  }

  // Create the Cognito user and add them to the given groups
  try {
    const response = await cognito.signUp({
      ClientId: createBasicUserParams.clientId,
      Username: createBasicUserParams.email,
      Password: createBasicUserParams.password,
      UserAttributes: [
        {
          Name: "email",
          Value: createBasicUserParams.email
        }
      ]
    }).promise();

    // If createUserParams.groups are provided, add the user to the given groups
    if (createBasicUserParams.groups && createBasicUserParams.groups.length > 0) {
      for (const group of createBasicUserParams.groups) {
        await cognito.adminAddUserToGroup({
          GroupName: group,
          Username: createBasicUserParams.email,
          UserPoolId: createBasicUserParams.userPoolId
        }).promise();
      }
    }

    return response as AWSModule.CognitoIdentityServiceProvider.SignUpResponse;
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
