import { doesNotMatch } from "assert";

import { JoiError } from "@gravitywelluk/validation-utils";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import Joi from "joi";

import { verifyBasicUserAccount } from "../../src/cognito/verify-basic-user-account";
import { confirmSignUpPromise } from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("verify-basic-cognito-user", () => {
  test("Can verify basic user account", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({ confirmSignUp: confirmSignUpPromise }));

    await verifyBasicUserAccount({
      clientId: "eu-west-2_testClientId12345",
      email: "test@test.co.uk",
      confirmationCode: "validCode"
    });
    expect(confirmSignUpPromise).toBeCalledTimes(1);
  });

  test("Fails to verify user if confirmation code not provided", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({ confirmSignUp: confirmSignUpPromise }));

    // @ts-expect-error
    await expect(verifyBasicUserAccount({
      clientId: "eu-west-2_testClientId12345",
      email: "test@test.co.uk"
    })).rejects.toThrow();
    expect(confirmSignUpPromise).toBeCalledTimes(0);
  });

  test("Fails if bad data supplied", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({ confirmSignUp: confirmSignUpPromise }));

    await expect(verifyBasicUserAccount({
      clientId: "eu-west-2_testClientId12345",
      // @ts-expect-error
      bad: "test@test.co.uk",
      data: "some bad data"
    })).rejects.toThrow();
  });
});