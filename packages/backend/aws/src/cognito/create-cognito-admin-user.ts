import * as Joi from "joi";
import type AWSModule from "aws-sdk";
import { JoiError } from "@gravitywelluk/validation-utils";

import { cognitoConfigure } from "./cognito-configure";
import { AwsError } from "../utils/aws-error";
import { cognitoListGroups } from "./utils";

export interface CreateCognitoAdminUserParams {
  userPoolId: string;
  email: string;
  groups?: string[];
  emailVerified?: boolean;
}

/**
 * Creates an admin user in Cognito and triggers the invitation email
 *
 * This kind of user will be sent an email containing a temporary password
 * The first time they use this temporary password to log in, they will be immediately prompted to change their password
 *
 * Wrapper for createCognitoUser to tidy up naming (making it clear that this is an admin user)
 * Needed for consistency with projects that still use createCognitoUser directly
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminAddUserToGroup-property
 * @param createAdminUserParams - The parameters required to create an admin Cognito user
 * @param awsCognitoConfigOverrides - Configuration option overrides
 */
export const createCognitoAdminUser = async (
  createAdminUserParams: CreateCognitoAdminUserParams,
  awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}
): Promise<AWSModule.CognitoIdentityServiceProvider.UserType> => {
  const cognito = cognitoConfigure(awsCognitoConfigOverrides);

  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    email: Joi.string().email(),
    emailVerified: Joi.boolean().optional(),
    groups: Joi.array().items(Joi.string().optional()).optional()
  }).validate(createAdminUserParams);

  // Error if there any Joi validation errors
  if (error) {
    throw new JoiError(error);
  }

  // If createUserParams.groups are provided, get the current Cognito groups
  // with the given user pool
  if (createAdminUserParams.groups && createAdminUserParams.groups.length > 0) {
    // Get all of the Cognito groups for the given user pool
    const allCognitoGroups = await cognitoListGroups(cognito, { UserPoolId: createAdminUserParams.userPoolId });
    // Validate that the given createUserParams.groups match the allCognitoGroups
    const { error: joiCognitoGroupsError } = Joi.array().items(Joi.string().valid(...allCognitoGroups).required()).validate(createAdminUserParams.groups);

    // Error if there any Joi validation errors regarding the given groups now
    // we have sight of the groups that can be chosen (allCognitoGroups)
    if (joiCognitoGroupsError) {
      throw new JoiError(joiCognitoGroupsError);
    }
  }

  // Create the Cognito user and add them to the given groups
  try {
    const { User } = await cognito.adminCreateUser({
      UserPoolId: createAdminUserParams.userPoolId,
      Username: createAdminUserParams.email,
      UserAttributes: [
        {
          Name: "email",
          Value: createAdminUserParams.email
        },
        {
          Name: "email_verified",
          Value: createAdminUserParams.emailVerified ? "True" : "False"
        }
      ]
    }).promise();

    // If createUserParams.groups are provided, add the user to the given groups
    if (createAdminUserParams.groups && createAdminUserParams.groups.length > 0) {
      for (const group of createAdminUserParams.groups) {
        // Only add the user to the group if the user has a username
        if (User?.Username) {
          await cognito.adminAddUserToGroup({
            GroupName: group,
            Username: User.Username,
            UserPoolId: createAdminUserParams.userPoolId
          }).promise();
        }
      }
    }

    return User as AWSModule.CognitoIdentityServiceProvider.UserType;
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
