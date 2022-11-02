import {
  APIError,
  ErrorType
} from "../src";

describe("@gravitywelluk/error package tests", () => {
  test("Correctly converts to an API error JSON object", () => {
    const errorObject = APIError.formatApiError(new APIError(ErrorType.InternalServerError, "Test server error"));

    expect(errorObject.statusCode).toBe(500);
    expect(errorObject.title).toBe("InternalServerError");
    expect(errorObject.message).toBe("Test server error");
  });

  test("Correctly handles a detail object", () => {
    const testParams = { test: "hello" };
    const errorObject = APIError.formatApiError(new APIError(ErrorType.InternalServerError, "Test server error", testParams));

    expect(errorObject.detail).toMatchObject(testParams);
  });
});
