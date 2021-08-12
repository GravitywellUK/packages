import * as Joi from "joi";
import * as R from "ramda";
import { jsonApiError } from "@gravitywelluk/json-api-error";

import { awsError } from "../utils/aws-error";
import { cognitoConfigure } from "./cognito-configure";

export interface CreateCognitoUserParams {
  userPoolId: string;
  email: string;
  groups?: string[];

}
/**
 * Create a user in cognito and trigger the invite email
 *
 * @param createUserParams
 * @param configOverrides
 */
export const createCognitoUser = async (createUserParams: CreateCognitoUserParams, availableGroups: string[], configOverrides = {}) => {
  const cognito = cognitoConfigure(configOverrides);

  const { error } = Joi.object({
    userPoolId: Joi.string().required(),
    email: Joi.string().email(),
    groups: Joi.array().items(Joi.string().valid(...availableGroups)).min(1).required()
  }).validate(createUserParams);

  if (error) {
    throw jsonApiError(error);
  }

  // get the available groups to make sure the action is going to work
  try {
    const groups = await cognito.listGroups({ UserPoolId: createUserParams.userPoolId }).promise();

    if (groups.Groups) {
      availableGroups = R.map(group => group.GroupName as string, groups.Groups);
    }
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "createCognitoUser"
    });
  }

  try {
    const user = await cognito.adminCreateUser({
      UserPoolId: createUserParams.userPoolId,
      Username: createUserParams.email,
      UserAttributes: [
        {
          Name: "email",
          Value: createUserParams.email
        }
      ]
    }).promise();

    // add to group
    if (createUserParams.groups) {
      for (const group of createUserParams.groups) {
        await cognito.adminAddUserToGroup({
          GroupName: group,
          Username: user.User?.Username as string,
          UserPoolId: createUserParams.userPoolId
        }).promise();
      }
    }

    return user;
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "createCognitoUser"
    });
  }
};
