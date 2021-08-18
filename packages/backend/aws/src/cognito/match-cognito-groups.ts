import * as Joi from "joi";
import * as R from "ramda";
import { jsonApiError } from "@gravitywelluk/json-api-error";

import { awsError } from "../utils/aws-error";
import { cognitoConfigure } from "./cognito-configure";
// import { jsonApiError, ERROR_CODE_ENUM } from "@gravitywelluk/json-api-error";
// import { CognitoIdentityServiceProvider } from "aws-sdk";

export interface MatchCognitoGroupsParams {
  userPoolId: string;
  cognitoId: string;
  groups?: string[];
}

/**
 *
 * @param createUserParams
 * @param configOverrides
 */
export const matchCognitoGroups = async (createUserParams: MatchCognitoGroupsParams, configOverrides = {}, availableGroups: string[] = ["Customer", "Admin"]) => {
  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    cognitoId: Joi.string().required(),
    groups: Joi.array().items(Joi.string().valid(...availableGroups)).min(1).required()
  }).validate(createUserParams);

  if (error) {
    throw jsonApiError(error);
  }
  const cognito = cognitoConfigure(configOverrides);
  const requestedGroups = createUserParams.groups || [];

  try {
    const groups = await cognito.adminListGroupsForUser({
      UserPoolId: createUserParams.userPoolId,
      Username: createUserParams.cognitoId
    }).promise();

    const currentGroups = groups.Groups ? R.map(groupAttrs => groupAttrs.GroupName, groups.Groups) : [];
    const toAdd = R.uniq(R.filter(groupName => !R.includes(groupName, currentGroups), requestedGroups));
    const toRemove = R.uniq(R.filter(groupName => !R.includes(groupName, requestedGroups), currentGroups));

    for (const GroupName of toRemove) {
      if (GroupName) {
        await cognito.adminRemoveUserFromGroup({
          GroupName,
          Username: createUserParams.cognitoId,
          UserPoolId: createUserParams.userPoolId
        }).promise();
      }
    }

    for (const GroupName of toAdd) {
      if (GroupName) {
        await cognito.adminAddUserToGroup({
          GroupName,
          Username: createUserParams.cognitoId,
          UserPoolId: createUserParams.userPoolId
        }).promise();
      }
    }

    return groups;
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "matchCognitoGroups"
    });
  }
};
