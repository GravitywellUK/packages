import {
  EnvironmentErrorCode,
  RequiredEnvironment,
  validateAppEnvironment
} from "../src";

describe("@gravitywelluk/environment package tests", () => {
  test("Correctly throws an error if environment variable is missing", async () => {
    const requiredEnv: RequiredEnvironment = { variables: [ "THIS_DEFINITELY_DOESNT_EXIST" ] };

    try {
      await validateAppEnvironment(process.env.ENVIRONMENT, requiredEnv);
    } catch (e) {
      expect(e.code).toEqual(EnvironmentErrorCode.MissingVariables);
    }
  });

  test("Correctly returns the parsed environment if validation passes", async () => {
    const requiredEnv: RequiredEnvironment = { variables: [ "NODE_ENV" ] };
    // set stage to "production" so the validation returns process.env instead of trying to find a dotenv file
    const environment = await validateAppEnvironment("production", requiredEnv);

    expect(environment).toHaveProperty("NODE_ENV");
  });
});