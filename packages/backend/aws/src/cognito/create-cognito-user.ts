import * as Joi from "joi";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import type AWSModule from "aws-sdk";

import { awsError } from "../utils";
import { cognitoConfigure } from "./cognito-configure";

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
    groups: Joi.array().items(Joi.string().required()).optional()
  }).validate(createUserParams);

  let allCognitoGroups: string[] = [];

  // Error if there any Joi validation errors
  if (error) {
    throw jsonApiError(error);
  }

  // If createUserParams.groups are provided, get the current Cognito groups
  // with the given user pool
  if (createUserParams.groups) {
    try {
      const cognitoGroupList = await cognito.listGroups({ UserPoolId: createUserParams.userPoolId }).promise();

      // If groups are returned in the response, collate the group names and set
      // allCognitoGroups
      allCognitoGroups = cognitoGroupList.Groups ? cognitoGroupList.Groups.map(group => group.GroupName).filter(groupName => typeof groupName === "string") as string[] : [];
    } catch (error) {
      throw awsError(error, {
        environment: process.env.ENVIRONMENT,
        functionName: "createCognitoUser"
      });
    }

    // Validate that the given createUserParams.groups match the allCognitoGroups
    const { error: joiCognitoGroupsError } = Joi.array().items(Joi.string().valid(...allCognitoGroups).required()).validate(createUserParams.groups);

    // Error if there any Joi validation errors regarding the given groups now
    // we have sight of the groups that can be chosen (allCognitoGroups)
    if (joiCognitoGroupsError) {
      throw jsonApiError(joiCognitoGroupsError);
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
    if (createUserParams.groups) {
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
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "createCognitoUser"
    });
  }
};
