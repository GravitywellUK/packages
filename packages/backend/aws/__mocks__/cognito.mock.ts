import {
  AdminCreateUserResponse,
  AdminListGroupsForUserResponse,
  ConfirmSignUpResponse,
  ListGroupsResponse,
  SignUpResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import * as R from "ramda";

export const signUpPromise: jest.Mock<SignUpResponse> = jest.fn().mockReturnValue({
  promise: jest.fn().mockResolvedValue({
    CodeDeliveryDetails: "",
    UserConfirmed: false,
    UserSub: "exampleSub"
  })
});
export const confirmSignUpPromise: jest.Mock<ConfirmSignUpResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockReturnValue({}) });
export const adminCreateUserPromise: jest.Mock<AdminCreateUserResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ User: { Username: "test" } }) });
export const adminDeleteUserPromise: jest.Mock<AdminCreateUserResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
export const adminAddUserToGroupPromise: jest.Mock<Record<string, unknown>> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
export const adminRemoveUserFromGroupPromise: jest.Mock<Record<string, unknown>> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
export const listGroupsPromise: jest.Mock<ListGroupsResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Groups: [ { GroupName: "Admin" }, { GroupName: "Customer" } ] }) });
export const getAdminListGroupsForUserPromise = (groups: string[]): jest.Mock<AdminListGroupsForUserResponse> => jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Groups: R.map(group => ({ GroupName: group }), groups) }) });