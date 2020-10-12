import createEvent from "@serverless/event-mocks";
import Joi from "@hapi/joi";

import { checkEventBody } from "../src/check-event-body";

describe("@gravitywelluk/lambda-utils check-event-body", () => {
  const schema = {
    name: Joi.string(),
    age: Joi.number()
  };

  test("Parses valid event body", () => {
    const validBody = {
      name: "George",
      age: 25
    };

    const validEvent = createEvent("aws:apiGateway", { body: JSON.stringify(validBody) } as never);
    const data = checkEventBody(validEvent.body, schema);

    expect(data).toEqual(validBody);
  });

  test("Errors on invalid json", () => {
    const invalidJsonEvent = createEvent("aws:apiGateway", { body: "invalid" } as never);

    expect(() => checkEventBody(invalidJsonEvent.body, schema)).toThrow();
  });

  test("Errors on mismatching schema", () => {
    const invalidBody = {
      name: "George",
      age: "twenty five"
    };

    const invalidEvent = createEvent("aws:apiGateway", { body: JSON.stringify(invalidBody) } as never);

    expect(() => checkEventBody(invalidEvent.body, schema)).toThrow();
  });
});