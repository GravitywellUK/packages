import * as Joi from "joi";
import type AWSModule from "aws-sdk";
import { JoiError } from "@gravitywelluk/validation-utils";

import { cognitoConfigure } from "./cognito-configure";
import { AwsError } from "../utils/aws-error";
import { cognitoListGroups } from "./utils";

export interface CreateCognitoUserParams {
  userPoolId: string;
  email: string;
  groups?: string[];
  emailVerified?: boolean;
}

/**
 * Creates a user in Cognito and triggers the invitation email
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminAddUserToGroup-property
 * @param createUserParams - The parameters required to create a Cognito user
 * @param awsCognitoConfigOverrides - Configuration option overrides
 */
export const createCognitoUser = async (
  createUserParams: CreateCognitoUserParams,
  awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}
): Promise<AWSModule.CognitoIdentityServiceProvider.UserType> => {
  const cognito = cognitoConfigure(awsCognitoConfigOverrides);

  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    email: Joi.string().email(),
    emailVerified: Joi.boolean().optional(),
    groups: Joi.array().items(Joi.string().optional()).optional()
  }).validate(createUserParams);

  // Error if there any Joi validation errors
  if (error) {
    throw new JoiError(error);
  }

  // If createUserParams.groups are provided, get the current Cognito groups
  // with the given user pool
  if (createUserParams.groups && createUserParams.groups.length > 0) {
    // Get all of the Cognito groups for the given user pool
    const allCognitoGroups = await cognitoListGroups(cognito, { UserPoolId: createUserParams.userPoolId });
    // Validate that the given createUserParams.groups match the allCognitoGroups
    const { error: joiCognitoGroupsError } = Joi.array().items(Joi.string().valid(...allCognitoGroups).required()).validate(createUserParams.groups);

    // Error if there any Joi validation errors regarding the given groups now
    // we have sight of the groups that can be chosen (allCognitoGroups)
    if (joiCognitoGroupsError) {
      throw new JoiError(joiCognitoGroupsError);
    }
  }

  // Create the Cognito user and add them to the given groups
  try {
    const { User } = await cognito.adminCreateUser({
      UserPoolId: createUserParams.userPoolId,
      Username: createUserParams.email,
      UserAttributes: [
        {
          Name: "email",
          Value: createUserParams.email
        },
        {
          Name: "email_verified",
          Value: createUserParams.emailVerified ? "True" : "False"
        }
      ]
    }).promise();

    // If createUserParams.groups are provided, add the user to the given groups
    if (createUserParams.groups && createUserParams.groups.length > 0) {
      for (const group of createUserParams.groups) {
        // Only add the user to the group if the user has a username
        if (User?.Username) {
          await cognito.adminAddUserToGroup({
            GroupName: group,
            Username: User.Username,
            UserPoolId: createUserParams.userPoolId
          }).promise();
        }
      }
    }

    return User as AWSModule.CognitoIdentityServiceProvider.UserType;
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
