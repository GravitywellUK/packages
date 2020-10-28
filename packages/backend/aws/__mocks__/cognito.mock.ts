import { AdminCreateUserResponse, AdminListGroupsForUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";
import * as R from "ramda";

export const adminCreateUserPromise: jest.Mock<AdminCreateUserResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ User: { Username: "test" } }) });
export const adminDeleteUserPromise: jest.Mock<AdminCreateUserResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
export const adminAddUserToGroupPromise: jest.Mock<{}> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
export const adminRemoveUserFromGroupPromise: jest.Mock<{}> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
export const getAdminListGroupsForUserPromise = (groups: string[]): jest.Mock<AdminListGroupsForUserResponse> => jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Groups: R.map(group => ({ GroupName: group }), groups) }) });
export const getlistGroupsPromise = (groups: string[]): jest.Mock<AdminListGroupsForUserResponse> => jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Groups: R.map(group => ({ GroupName: group }), groups) }) });