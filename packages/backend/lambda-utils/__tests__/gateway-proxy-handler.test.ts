import createEvent from "@serverless/event-mocks";
import { APIGatewayProxyResult } from "aws-lambda";

import {
  gatewayProxyHandler, createContext, APIGatewayProxyHandlerAsync
} from "../src";

describe("@gravitywelluk/lambda-utils gateway-proxy-handler", () => {
  const mockContext = createContext();

  test("Basic handler works correctly", async () => {
    const mockValidEvent = createEvent("aws:apiGateway", {
      pathParameters: { id: 1 },
      requestContext: { authorizer: { sub: process.env.ADMIN_COGNITO_USER } }
    } as never);

    const handler: APIGatewayProxyHandlerAsync<{success: string}> = async () => {
      return {
        status: 200,
        data: { success: "ok" }
      };
    };

    const mockHandler = jest.fn(handler);
    const result = await gatewayProxyHandler<{success: string}>(mockHandler)(mockValidEvent, mockContext);

    expect(mockHandler).toBeCalledTimes(1);
    const data = JSON.parse((result as APIGatewayProxyResult).body);

    expect(data).toMatchObject({
      status: 200,
      data: { success: "ok" }
    });
  });

  test("Warmup handler works correctly and stops function", async () => {
    const mockValidEvent = createEvent("aws:apiGateway", {
      pathParameters: { id: 1 },
      requestContext: { authorizer: { sub: process.env.ADMIN_COGNITO_USER } },
      source: "serverless-plugin-warmup"
    } as never);

    const handler: APIGatewayProxyHandlerAsync<{success: string}> = async () => {
      return {
        status: 200,
        data: { success: "ok" }
      };
    };

    const mockHandler = jest.fn(handler);

    const mockWarmup = jest.fn(async () => {
      // eslint-disable-next-line no-console
      console.log("Warm up ran");
    });

    const result = await gatewayProxyHandler<{success: string}>(mockHandler, { warmup: mockWarmup })(mockValidEvent, mockContext);

    expect(mockHandler).toBeCalledTimes(0);
    expect(mockWarmup).toBeCalledTimes(1);
    expect(result).toBeUndefined();
  });

  test("Clean handler works correctly and stops function", async () => {
    const mockValidEvent = createEvent("aws:apiGateway", {
      pathParameters: { id: 1 },
      requestContext: { authorizer: { sub: process.env.ADMIN_COGNITO_USER } }
    } as never);

    const handler: APIGatewayProxyHandlerAsync<{success: string}> = async () => {
      return {
        status: 200,
        data: { success: "ok" }
      };
    };

    const mockHandler = jest.fn(handler);

    const mockCleanup = jest.fn(async () => {
      // eslint-disable-next-line no-console
      console.log("Warm up ran");
    });

    const result = await gatewayProxyHandler<{success: string}>(mockHandler, { cleanup: mockCleanup })(mockValidEvent, mockContext);

    expect(mockHandler).toBeCalledTimes(1);
    expect(mockCleanup).toBeCalledTimes(1);
    const data = JSON.parse((result as APIGatewayProxyResult).body);

    expect(data).toMatchObject({
      status: 200,
      data: { success: "ok" }
    });
  });
});