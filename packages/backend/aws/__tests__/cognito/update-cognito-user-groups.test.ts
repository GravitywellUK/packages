import { CognitoIdentityServiceProvider } from "aws-sdk";

import { updateCognitoUserGroup } from "../../src/cognito/update-cognito-user-groups";
import {
  adminAddUserToGroupPromise,
  adminRemoveUserFromGroupPromise,
  getAdminListGroupsForUserPromise,
  listGroupsPromise
} from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("update-cognito-user-groups", () => {
  test("Adds a group to a user", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise,
      listGroups: listGroupsPromise
    }));

    await updateCognitoUserGroup({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: [ "Admin", "Customer" ]
    });
    expect(adminListGroupsForUserPromise).toBeCalledTimes(2);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(1);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });

  test("Removes a group from a user", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin", "Customer" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise,
      listGroups: listGroupsPromise
    }));

    await updateCognitoUserGroup({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: [ "Admin" ]
    });
    expect(adminListGroupsForUserPromise).toBeCalledTimes(2);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });

  test("Prevents setting no group!", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise,
      listGroups: listGroupsPromise
    }));

    await expect(updateCognitoUserGroup({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: []
    })).rejects.toThrow();
    expect(adminListGroupsForUserPromise).toBeCalledTimes(0);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(0);
  });

  test("Prevents setting invalid group!", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise,
      listGroups: listGroupsPromise
    }));

    await expect(updateCognitoUserGroup({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: [ "Invalid!" ]
    })).rejects.toThrow();
    expect(adminListGroupsForUserPromise).toBeCalledTimes(0);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
    expect(listGroupsPromise).toBeCalledTimes(1);
  });
});