import {
  APIError,
  ErrorType
} from "../src";
import { ApiErrorResponse } from "../src/api-error";

describe("@gravitywelluk/error package tests", () => {
  test("Correctly converts to an API error JSON object", () => {
    const errorObject = APIError.formatApiError(new APIError("Test server error", ErrorType.InternalServerError));

    expect(errorObject.statusCode).toBe(500);
    expect(errorObject.title).toBe("InternalServerError");
    expect(errorObject.message).toBe("Test server error");
  });

  test("Correctly handles a loosely-typed detail object", () => {
    const testParams = { test: "hello" };
    const errorObject = APIError.formatApiError(new APIError("Test server error", ErrorType.InternalServerError, testParams), true);

    expect(errorObject.context).toMatchObject(testParams);
  });

  test("Correctly handles a strictly-typed detail object", () => {
    interface CustomErrorContext {
      foo: string;
      bar: number;
    }

    type CustomErrorContextType<D extends keyof CustomErrorContext = keyof CustomErrorContext> = Record<D, CustomErrorContext[D]>;

    class CustomProjectError extends APIError<CustomErrorContextType> {}

    const throwCustomProjectError = () => {
      throw new CustomProjectError("Test error message", ErrorType.Forbidden, {
        foo: "something",
        bar: 5
      });
    };

    expect(() => throwCustomProjectError()).toThrow("Test error message");
  });
});
