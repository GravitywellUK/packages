import type AWSModule from "aws-sdk";

import { createCognitoUser, CreateCognitoUserParams } from ".";

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
  createAdminUserParams: CreateCognitoUserParams,
  awsCognitoConfigOverrides: AWSModule.CognitoIdentityServiceProvider.ClientConfiguration = {}
): Promise<AWSModule.CognitoIdentityServiceProvider.UserType> => {
  createCognitoUser(createAdminUserParams, awsCognitoConfigOverrides);
} 