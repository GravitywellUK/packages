import { SecretsManager } from "aws-sdk";
import * as AWS from "aws-sdk";

import {
  EnvironmentErrorCode,
  RequiredEnvironment,
  validateAppEnvironment
} from "../src";

export const getSecretValueMock: jest.Mock<AWS.SecretsManager.GetSecretValueResponse> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ SecretString: JSON.stringify({ TEST_ENVIRONMENT_VAR: "TEST" }) }) });

jest.mock("aws-sdk");
//@ts-ignore
(SecretsManager as jest.Mock).mockImplementation(() => ({ getSecretValue: getSecretValueMock }));

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

  test("Does not return unwanted process.env vars", async () => {
    const requiredEnv: RequiredEnvironment = { variables: [ "NODE_ENV" ] };

    process.env[ "UNWANTED_VAR" ] = "test";
    // set stage to "production" so the validation returns process.env instead of trying to find a dotenv file
    const environment = await validateAppEnvironment("production", requiredEnv);

    expect(environment).toHaveProperty("NODE_ENV");
    expect(environment[ "UNWANTED_VAR" ]).toBeUndefined();
  });

  test("Does not set secret variables when loadValuesToEnvironment is not set", async () => {
    process.env[ "MOCK_ARN" ] = "mock-arn";

    const requiredEnv: RequiredEnvironment = {
      variables: [ "NODE_ENV" ],
      awsSecrets: [ "MOCK_ARN" ]
    };

    // set stage to "production" so the validation returns process.env instead of trying to find a dotenv file
    const environment = await validateAppEnvironment("production", requiredEnv);

    expect(environment[ "TEST_ENVIRONMENT_VAR" ]).toBeUndefined();
    expect(environment).toHaveProperty("NODE_ENV");
  });

  test("Correctly adds secret values to the environment", async () => {
    process.env[ "MOCK_ARN" ] = "mock-arn";

    const requiredEnv: RequiredEnvironment = {
      variables: [ "NODE_ENV" ],
      awsSecrets: [
        {
          secret: "MOCK_ARN",
          loadValuesToEnvironment: true
        }
      ]
    };

    // set stage to "production" so the validation returns process.env instead of trying to find a dotenv file
    const environment = await validateAppEnvironment("production", requiredEnv);

    expect(environment).toHaveProperty("TEST_ENVIRONMENT_VAR");
    expect(environment).toHaveProperty("NODE_ENV");
  });
});
