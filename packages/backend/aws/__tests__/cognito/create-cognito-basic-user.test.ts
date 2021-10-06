import { CognitoIdentityServiceProvider } from "aws-sdk";

import { createCognitoBasicUser } from "../../src/cognito/create-cognito-basic-user";
import {
  adminAddUserToGroupPromise,
  listGroupsPromise,
  signUpPromise
} from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("create-basic-cognito-user", () => {
  test("Can create basic user without the group property", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      signUp: signUpPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await createCognitoBasicUser({
      userPoolId: "eu-west-2_testUserPool12345",
      clientId: "eu-west-2_testClientId12345",
      email: "test@test.co.uk",
      password: "password"
    });
    expect(signUpPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(0);
  });

  test("Can create basic user with an empty group", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      signUp: signUpPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await createCognitoBasicUser({
      userPoolId: "eu-west-2_testUserPool12345",
      clientId: "eu-west-2_testClientId12345",
      email: "test@test.co.uk",
      password: "password",
      groups: []
    });
    expect(signUpPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(0);
  });

  test("Can create basic user with group", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      signUp: signUpPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await createCognitoBasicUser({
      userPoolId: "eu-west-2_testUserPool12345",
      clientId: "eu-west-2_testClientId12345",
      email: "test@test.co.uk",
      password: "password",
      groups: [ "Customer" ]
    });
    expect(signUpPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(1);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });

  test("Will not create if group invalid", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      signUp: signUpPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await expect(createCognitoBasicUser({
      userPoolId: "eu-west-2_testUserPool12345",
      clientId: "eu-west-2_testClientId12345",
      email: "test@test.co.uk",
      password: "password",
      groups: [ "Invalid" ]
    })).rejects.toThrow();
    expect(signUpPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });

  test("Fails if bad data supplied", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      signUp: signUpPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await expect(createCognitoBasicUser({
      groups: [ "Customer" ],
      // @ts-expect-error
      bad: "eu-west-2_test12345",
      data: "test@test.co.uk"
    }, [ "Customer" ])).rejects.toThrow();
  });
});