import { CognitoIdentityServiceProvider } from "aws-sdk";

import { deleteCognitoUser } from "../../src/cognito/delete-cognito-user";
import { adminDeleteUserPromise } from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("delete-cognito-user", () => {
  test("Can delete a user", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({ adminDeleteUser: adminDeleteUserPromise }));

    await deleteCognitoUser({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "test-id"
    });
  });

  test("Fails to delete a user on bad data", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({ adminDeleteUser: adminDeleteUserPromise }));

    await expect(deleteCognitoUser({
      // @ts-expect-error
      adsfg: "eu-west-2_test12345",
      cognitoId: "test-id"
    })).rejects.toThrowError();
  });
});