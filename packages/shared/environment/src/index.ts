import { ErrorType } from "@gravitywelluk/error";
import { SecretsManager } from "aws-sdk";
import * as dotenv from "dotenv";
import { createDebug } from "@gravitywelluk/debug";
import * as R from "ramda";

import { EnvironmentError } from "./EnvironmentError";

const debug = createDebug("VALIDATE_ENV");

export interface RequiredEnvironment {
  variables?: string[];
  awsSecrets?: Array<RequiredEnvironmentAwsSecretAttributes | string>;
}

interface RequiredEnvironmentAwsSecretAttributes {
  secret: string;
  loadValuesToEnvironment: boolean
}

type ValidateAppEnvironment = (environment: string, params: RequiredEnvironment) => Promise<Record<string, string>>;

/**
 * Validates the run-time environment variables against the given set of
 * required variables.
 *
 * During local development (when the environment is set to "local" or "development"),
 * the local .env.* file will be validated. Environment variables loaded via the
 * servers configuration (process.env) will be validated if the environment is anything else.
 *
 * @param environment - The environment name.
 * @param params - A set of required environment variables to validate.
 * @returns An object of valid environment variables
 */
export const validateAppEnvironment: ValidateAppEnvironment = async (
  environment,
  { variables = [], awsSecrets = [] }
) => {
  const missingEnvironmentVariables: string[] = [];
  const missingSecrets: string[] = [];
  let secretsEnvironment: Record<string, string> = {};

  // Validate the given environment variables if required variables have been set
  if (variables.length > 0) {
    for (const variable of variables) {
      const value = process.env[ variable ];

      // if env var not present or empty string
      if (!value || value?.length === 0) {
      // add to missing list
        missingEnvironmentVariables.push(variable);
      }
    }

    // Throw an error if there are any missing environment variables
    if (missingEnvironmentVariables.length > 0) {
      throw new EnvironmentError(
        `Could not find required environment variables: ${missingEnvironmentVariables.join(", ")}.`,
        ErrorType.UnprocessableEntity
      );
    }
  }

  // Validate the given AWS secret variables if required secret variables have been set
  if (awsSecrets.length > 0) {
    const secretsManager = new SecretsManager();

    for (const secretObject of awsSecrets) {
      let secretName = "";
      let setToEnvironment = false;

      if (typeof secretObject === "object") {
        secretName = secretObject.secret;
        setToEnvironment = secretObject.loadValuesToEnvironment;
      } else {
        secretName = secretObject;
      }

      // secret ARN should be stored in environment
      const secretARN = process.env[ secretName ];

      if (!secretARN) {
        missingSecrets.push(secretName);
        debug.info(`${secretName} secret ARN not set in environment`);
        break;
      }

      try {
        // attempt to fetch secret by ARN
        const secretValue = await secretsManager.getSecretValue({ SecretId: secretARN }).promise();

        if (setToEnvironment) {
          const secretsJson = JSON.parse(secretValue.SecretString as string);

          secretsEnvironment = Object.assign(secretsEnvironment, secretsJson);
        }
      // catch 400 not found and add to missing list
      } catch (e) {
        debug.error(`Failed to fetch secret ${secretName}:`, e);
        missingSecrets.push(secretName);
      }
    }

    // Throw an error if there are any missing secret variables
    if (missingSecrets.length > 0) {
      throw new EnvironmentError(
        `Could not retrieve required secrets from AWS: ${missingSecrets.join(", ")}.`,
        ErrorType.UnprocessableEntity
      );
    }
  }

  // Load the environment variables from the local .env.* file if environment is set
  // to "local" or "development", otherwise use the global NodeJs environment variables
  // loaded via the servers configuration.
  const appEnvironment = environment === "local" || environment === "development" ?
    // return parsed dotenv file in local environment
    {
      ...dotenv.config({ path: `.env.${environment}` }).parsed as Record<string, string>,
      ...secretsEnvironment
    } :
    // otherwise return pre-loaded env for CI/CD
    {
      ...(R.pick(variables, process.env as Record<string, string>)),
      ...secretsEnvironment
    };

  return appEnvironment;
};
