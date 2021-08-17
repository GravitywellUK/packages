import {
  jsonApiError,
  ERROR_CODE_ENUM
} from "../src/json-api-error";

describe("@gravitywelluk/json-api-error package tests", () => {
  test("Correctly accepts and returns an error object", () => {
    const validErrorObject = {
      status: 400,
      title: "Valid error",
      details: "A valid error happened",
      code: ERROR_CODE_ENUM.API_ERROR
    };

    const errorObject = jsonApiError(validErrorObject);

    expect(errorObject.toJson()).toMatchObject(validErrorObject);
    // it should add the id if not there
    expect(errorObject.id).toBeTruthy();
  });

  test("Correctly accepts and returns an error object", () => {
    const errorString = "Standard thrown error";
    const standardError = new Error(errorString);
    const errorObject = jsonApiError(standardError);

    expect(errorObject.status).toBe(500);
    expect(errorObject.code).toBe(ERROR_CODE_ENUM.API_ERROR);
    expect(errorObject.message).toBe(errorString);
    expect(errorObject.id).toBeTruthy();
  });

  test("Correctly handles an unknown object", () => {
    const undefinedError = undefined;
    const errorObject = jsonApiError(undefinedError);

    expect(errorObject.status).toBe(500);
    expect(errorObject.code).toBe(ERROR_CODE_ENUM.UNKNOWN_ERROR);
  });
});