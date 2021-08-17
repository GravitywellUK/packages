import { CognitoIdentityServiceProvider } from "aws-sdk";

import { matchCognitoGroups } from "../../src/cognito/match-cognito-groups";
import {
  adminAddUserToGroupPromise,
  adminRemoveUserFromGroupPromise,
  getAdminListGroupsForUserPromise
} from "../../__mocks__/cognito.mock";

jest.mock("aws-sdk");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("match-cognito-groups", () => {
  test("Adds a group to a user", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise
    }));

    await matchCognitoGroups({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: [ "Admin", "Customer" ]
    });
    expect(adminListGroupsForUserPromise).toBeCalledTimes(1);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(1);
  });

  test("Removes a group from a user", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin", "Customer" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise
    }));

    await matchCognitoGroups({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: [ "Admin" ]
    });
    expect(adminListGroupsForUserPromise).toBeCalledTimes(1);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(1);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
  });

  test("Prevents setting no group!", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise
    }));

    await expect(matchCognitoGroups({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: []
    })).rejects.toThrow();
    expect(adminListGroupsForUserPromise).toBeCalledTimes(0);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
  });

  test("Prevents setting invalid group!", async () => {
    const adminListGroupsForUserPromise = getAdminListGroupsForUserPromise([ "Admin" ]);

    // @ts-ignore
    CognitoIdentityServiceProvider.mockImplementation(() => ({
      adminAddUserToGroup: adminAddUserToGroupPromise,
      adminRemoveUserFromGroup: adminRemoveUserFromGroupPromise,
      adminListGroupsForUser: adminListGroupsForUserPromise
    }));

    await expect(matchCognitoGroups({
      userPoolId: "eu-west-2_test12345",
      cognitoId: "example-cognito-user-id",
      groups: [ "Invalid!" ]
    })).rejects.toThrow();
    expect(adminListGroupsForUserPromise).toBeCalledTimes(0);
    expect(adminRemoveUserFromGroupPromise).toBeCalledTimes(0);
    expect(adminAddUserToGroupPromise).toBeCalledTimes(0);
  });
});