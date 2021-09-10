import createEvent from "@serverless/event-mocks";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";

import {
  buildApiResponse,
  createContext
} from "../src";

describe("@gravitywelluk/lambda-utils build-api-response", () => {
  const mockContext = createContext();

  test("Build a valid 200 response", () => {
    const validApiResponse = {
      status: 200,
      data: {
        name: "George",
        age: 25
      }
    };

    const gatewayEvent = createEvent("aws:apiGateway", {} as APIGatewayProxyEvent);

    const data = buildApiResponse(
      gatewayEvent, mockContext, validApiResponse
    );

    expect(typeof data.body).toBe("string");
    expect(data.statusCode).toBe(200);
  });

  test("Handle an known error response", () => {
    const errorResponse = new APIError("Not found", ErrorType.NotFoundError);
    const gatewayEvent = createEvent("aws:apiGateway", {} as APIGatewayProxyEvent);

    const data = buildApiResponse(
      gatewayEvent, mockContext, errorResponse
    );

    expect(typeof data.body).toBe("string");
    expect(data.statusCode).toBe(404);
  });

  test("Handle no error to unknown error", () => {
    const errorResponse = new Error("Unknown error");
    const gatewayEvent = createEvent("aws:apiGateway", {} as APIGatewayProxyEvent);

    const data = buildApiResponse(
      gatewayEvent, mockContext, errorResponse
    );

    expect(data.body).toContain(ErrorType.UnknownError);
    expect(typeof data.body).toBe("string");
    expect(data.statusCode).toBe(500);
  });
});
