import createEvent from "@serverless/event-mocks";
import Joi from "@hapi/joi";

import { checkEventParams } from "../src/check-event-params";

describe("@gravitywelluk/lambda-utils check-event-body", () => {
  const schema = {
    userId: Joi.number(),
    uuid: Joi.string()
  };

  test("Parses valid path parameters from string to ", () => {
    const validPathParameters = {
      userId: "1",
      uuid: "eb79d17a-9c11-11ea-bb37-0242ac130002"
    };

    const data = checkEventParams<{userId: number | string; uuid: string}, typeof schema>(validPathParameters, schema);

    expect(data).toEqual({
      userId: 1,
      uuid: validPathParameters.uuid
    });
  });

  test("Errors on mismatching schema", () => {
    const invalidPathParameters = {
      uuid: "1",
      userId: "eb79d17a-9c11-11ea-bb37-0242ac130002"
    };

    const invalidEvent = createEvent("aws:apiGateway", { pathParameters: invalidPathParameters } as never);

    expect(() => checkEventParams(invalidEvent.pathParameters, schema)).toThrow();
  });
});