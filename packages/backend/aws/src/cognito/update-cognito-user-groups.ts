import * as Joi from "joi";
import * as R from "ramda";
import { jsonApiError } from "@gravitywelluk/json-api-error";
import type AWSModule from "aws-sdk";

import { awsError } from "../utils";
import { cognitoConfigure } from "./cognito-configure";
import { cognitoListGroups } from "./utils";

export interface UpdateCognitoGroupsParams {
  userPoolId: string;
  cognitoId: string;
  groups: string[];
}

/**
 * Updates the given Cognito user's groups, equivalent to a PUT request
 *
 * @param updateUserParams - The parameters required to create a Cognito user
 * @param awsCognitoConfigOverrides - Configuration option overrides
 */
export const updateCognitoUserGroup = async (
  updateUserParams: UpdateCognitoGroupsParams,
  awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}
): Promise<AWSModule.CognitoIdentityServiceProvider.GroupListType> => {
  const cognito = cognitoConfigure(awsCognitoConfigOverrides);
  const requestedGroups = updateUserParams.groups || [];

  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    cognitoId: Joi.string().required(),
    groups: Joi.array().items(Joi.string().required()).required()
  }).validate(updateUserParams);

  // Error if there any Joi validation errors
  if (error) {
    throw jsonApiError(error);
  }

  // Get all of the Cognito groups for the given user pool
  const allCognitoGroups = await cognitoListGroups(cognito, { UserPoolId: updateUserParams.userPoolId });
  // Validate that the given updateUserParams.groups match the allCognitoGroups
  const { error: joiCognitoGroupsError } = Joi.array().items(Joi.string().valid(...allCognitoGroups).required()).validate(updateUserParams.groups);

  // Error if there any Joi validation errors regarding the given groups now
  // we have sight of the groups that can be chosen (allCognitoGroups)
  if (joiCognitoGroupsError) {
    throw jsonApiError(joiCognitoGroupsError);
  }

  try {
    // Get the user's assigned groups
    const cognitoUserGroupList = await cognito.adminListGroupsForUser({
      UserPoolId: updateUserParams.userPoolId,
      Username: updateUserParams.cognitoId
    }).promise();

    // Collate the group names
    const currentCognitoGroups = cognitoUserGroupList.Groups ? cognitoUserGroupList.Groups.map(group => group.GroupName).filter(groupName => typeof groupName === "string") as string[] : [];
    const toAdd = R.uniq(R.filter(groupName => !R.includes(groupName, currentCognitoGroups), requestedGroups));
    const toRemove = R.uniq(R.filter(groupName => !R.includes(groupName, requestedGroups), currentCognitoGroups));

    // Removed the user from the toRemove groups
    for (const GroupName of toRemove) {
      await cognito.adminRemoveUserFromGroup({
        GroupName,
        Username: updateUserParams.cognitoId,
        UserPoolId: updateUserParams.userPoolId
      }).promise();
    }

    // Add the user to the toAdd groups
    for (const GroupName of toAdd) {
      await cognito.adminAddUserToGroup({
        GroupName,
        Username: updateUserParams.cognitoId,
        UserPoolId: updateUserParams.userPoolId
      }).promise();
    }

    // Get and return the final user groups
    const { Groups: finalCognitoUserGroupList } = await cognito.adminListGroupsForUser({
      UserPoolId: updateUserParams.userPoolId,
      Username: updateUserParams.cognitoId
    }).promise();

    return finalCognitoUserGroupList as AWSModule.CognitoIdentityServiceProvider.GroupListType;
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "matchCognitoGroups"
    });
  }
};