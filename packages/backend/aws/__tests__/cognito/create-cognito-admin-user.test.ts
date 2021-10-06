import { CognitoIdentityServiceProvider } from "aws-sdk";

import { createCognitoAdminUser } from "../../src/cognito/create-cognito-admin-user";
import {
  adminAddUserToGroupPromise,
  adminCreateUserPromise,
  listGroupsPromise
} from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("create-admin-cognito-user", () => {
  test("Can create admin user without the group property", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await createCognitoAdminUser({
      userPoolId: "eu-west-2_test12345",
      email: "test@test.co.uk"
    });
    expect(adminCreateUserPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(0);
  });

  test("Can create admin user with an empty group", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await createCognitoAdminUser({
      userPoolId: "eu-west-2_test12345",
      email: "test@test.co.uk",
      groups: []
    });
    expect(adminCreateUserPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(0);
  });

  test("Can create admin user with group", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await createCognitoAdminUser({
      userPoolId: "eu-west-2_test12345",
      email: "test@test.co.uk",
      groups: [ "Admin" ]
    });
    expect(adminCreateUserPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(1);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });

  test("Will not create if group invalid", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await expect(createCognitoAdminUser({
      userPoolId: "eu-west-2_test12345",
      email: "test@test.co.uk",
      groups: [ "Invalid" ]
    })).rejects.toThrow();
    expect(adminCreateUserPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });

  test("Fails if bad data supplied", async () => {
    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminCreateUser: adminCreateUserPromise,
      adminAddUserToGroup: adminAddUserToGroupPromise,
      listGroups: listGroupsPromise
    }));

    await expect(createCognitoAdminUser({
      groups: [ "Admin" ],
      // @ts-expect-error
      bad: "eu-west-2_test12345",
      data: "test@test.co.uk"
    }, [ "Admin" ])).rejects.toThrow();
  });
});