import { CognitoIdentityServiceProvider } from "aws-sdk";

import { createCognitoUser } from "../../src/cognito/create-cognito-user";
import {
  adminAddUserToGroupPromise,
  adminCreateUserPromise,
  getlistGroupsPromise
} from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("create-cognito-user", () => {
  test("Can create user with group", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      listGroups: getlistGroupsPromise([ "Admin", "Customer" ]),
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise
    }));

    await createCognitoUser({
      userPoolId: "eu-west-2_test12345",
      email: "test@test.co.uk",
      groups: [ "Admin" ]
    }, [ "Admin", "Customer" ]);
    expect(adminCreateUserPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(1);
  });

  test("Will not create if group invalid", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      listGroups: getlistGroupsPromise([ "Admin", "Customer" ]),
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise
    }));

    await expect(createCognitoUser({
      userPoolId: "eu-west-2_test12345",
      email: "test@test.co.uk",
      groups: [ "Invalid" ]
    }, [ "Admin", "Customer" ])).rejects.toThrow();
  });

  test("Fails if bad data supplied", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminCreateUser: adminCreateUserPromise,
      listGroups: getlistGroupsPromise([ "Admin", "Customer" ])
    }));

    await expect(createCognitoUser({
      groups: [ "Admin" ],
      // @ts-expect-error
      bad: "eu-west-2_test12345",
      data: "test@test.co.uk"
    }, [ "Admin" ])).rejects.toThrow();
  });
});