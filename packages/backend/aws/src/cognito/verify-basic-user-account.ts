import * as Joi from "joi";
import type AWSModule from "aws-sdk";
import { JoiError } from "@gravitywelluk/validation-utils";

import { cognitoConfigure } from ".";
import { AwsError } from "../utils";

export interface VerifyCognitoBasicUserAccountParams {
  clientId: string;
  confirmationCode: string;
  email: string;
}

/**
 * Verify a user's account by entering the confirmation code sent to them via text or email
 * This code is checked and if it matches then the user's account is enabled and they can log in with the details they originally provided
 *
 * @param verifyBasicUserParams The parameters required to verify a user's account
 */
export const verifyBasicUserAccount = async (
  verifyBasicUserParams: VerifyCognitoBasicUserAccountParams
) => {
  const cognito = cognitoConfigure();

  const { error } = Joi.object({
    clientId: Joi.string().required(),
    confirmationCode: Joi.string().required(),
    email: Joi.string().email().required()
  }).validate(verifyBasicUserParams);

  // Error if there any Joi validation errors
  if (error) {
    throw new JoiError(error);
  }

  try {
    const response = await cognito.confirmSignUp({
      ClientId: verifyBasicUserParams.clientId,
      ConfirmationCode: verifyBasicUserParams.confirmationCode,
      Username: verifyBasicUserParams.email
    }).promise();

    return response as AWSModule.CognitoIdentityServiceProvider.ConfirmSignUpResponse;
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};