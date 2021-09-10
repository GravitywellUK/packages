import type AWSModule from "aws-sdk";

import { awsError } from "../../utils";

/**
 * List the Cognito groups
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listGroups-property
 * @params cognitoServiceProvider - A Cognito identity service object
 * @params param - Cognito list group parameters
 */
export const cognitoListGroups = async (cognitoServiceProvider: AWSModule.CognitoIdentityServiceProvider, params: AWSModule.CognitoIdentityServiceProvider.ListGroupsRequest): Promise<string[]> => {
  let cognitoGroups: string[] = [];

  try {
    const cognitoGroupList = await cognitoServiceProvider.listGroups(params).promise();

    // If groups are returned in the response, collate the group names
    cognitoGroups = cognitoGroupList.Groups ? cognitoGroupList.Groups.map(group => group.GroupName).filter(groupName => typeof groupName === "string") as string[] : [];
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "updateCognitoUserGroups"
    });
  }

  return cognitoGroups;
};