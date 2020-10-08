import createEvent from "@serverless/event-mocks";
import { ERROR_CODE_ENUM } from "@gravitywelluk/json-api-error";
import { APIGatewayProxyEvent } from "aws-lambda";

import { buildApiResponse, createContext } from "../src";

describe("build-api-respone", () => {
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
    const errorResponse = {
      title: "Not found",
      status: 404,
      details: "document could not be found",
      code: ERROR_CODE_ENUM.NOT_FOUND_ERROR
    };

    const gatewayEvent = createEvent("aws:apiGateway", {} as APIGatewayProxyEvent);

    const data = buildApiResponse(
      gatewayEvent, mockContext, errorResponse
    );

    expect(typeof data.body).toBe("string");
    expect(data.statusCode).toBe(404);
  });

  test("Handle no error to unknwon error", () => {
    const errorResponse = { status: 404 };
    const gatewayEvent = createEvent("aws:apiGateway", {} as APIGatewayProxyEvent);

    const data = buildApiResponse(
      gatewayEvent, mockContext, errorResponse
    );

    expect(data.body).toContain(ERROR_CODE_ENUM.UNKNOWN_ERROR);
    expect(typeof data.body).toBe("string");
    expect(data.statusCode).toBe(404);
  });
});