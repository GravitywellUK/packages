import { APIError } from "../src";
import { ErrorType } from "../src/ApiError";

describe("@gravitywelluk/error package tests", () => {
  test("Correctly creates an error class instance with custom  codes", () => {
    enum ErrorCode {
      UserNotAllowed = "user_not_allowed",
    }

    class TestError extends APIError<ErrorCode> {}
    const errorObject = new TestError("Test error", ErrorType.ApiError, ErrorCode.UserNotAllowed);

    expect(errorObject.type).toBe(ErrorType.ApiError);
    // it should add the id if not there
    expect(errorObject.code).toBe(ErrorCode.UserNotAllowed);
    expect(errorObject.message).toBe("Test error");
  });

  test("Correctly converts to a api error json object", () => {
    const errorObject = APIError.formatApiError(new APIError("Test unknown error"));

    expect(errorObject.statusCode).toBe(500);
    expect(errorObject.type).toBe(ErrorType.UnknownError);
    expect(errorObject.message).toBe("Test unknown error");
  });

  test("Correctly handles a params object", () => {
    const testParams = { test: "hello" };
    const errorObject = APIError.formatApiError(new APIError<null>("Test unknown error", ErrorType.ApiError, null, testParams));

    expect(errorObject.param).toMatchObject(testParams);
  });
});
