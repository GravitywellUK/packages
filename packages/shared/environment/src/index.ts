import {
  APIError,
  ErrorType
} from "@gravitywelluk/error";
import { SecretsManager } from "aws-sdk";
import * as dotenv from "dotenv";
import { createDebug } from "@gravitywelluk/debug";

export enum EnvironmentErrorCode {
  MissingVariables = "missing_variables",
  MissingAWSSecrets = "missing_aws_secrets"
}

const debug = createDebug("VALIDATE_ENV");
class EnvironmentError extends APIError<EnvironmentErrorCode> {}

export interface RequiredEnvironment {
  variables?: string[];
  awsSecrets?: string[];
}

type ValidateAppEnvironment = (stage: string, params: RequiredEnvironment) => Promise<Record<string, string>>;

export const validateAppEnvironment: ValidateAppEnvironment = async (
  stage,
  { variables = [], awsSecrets = [] }
) => {
  const missingEnvironmentVariables: string[] = [];
  const missingSecrets: string[] = [];

  if (variables.length > 0) {
    // check for environment variables
    for (const variable of variables) {
      const value = process.env[ variable ];

      // if env var not present or empty string
      if (!value || value?.length === 0) {
        // add to missing list
        missingEnvironmentVariables.push(variable);
      }
    }

    if (missingEnvironmentVariables.length > 0) {
      throw new EnvironmentError(
        `Could not find required environment variables: ${missingEnvironmentVariables.join(", ")}.`,
        ErrorType.InvalidData,
        EnvironmentErrorCode.MissingVariables
      );
    }
  }

  if (awsSecrets.length > 0) {
    // check for secrets
    const secretsManager = new SecretsManager();

    for (const secret of awsSecrets) {
      // secret ARN should be stored in environment
      const secretARN = process.env[ secret ];

      if (!secretARN) {
        missingSecrets.push(secret);
        debug.info(`${secret} secret ARN not set in environment`);
        break;
      }

      try {
        // attempt to fetch secret by ARN
        await secretsManager.getSecretValue({ SecretId: secretARN }).promise();
      // catch 400 not found and add to missing list
      } catch (e) {
        debug.error(`Failed to fetch secret ${secret}:`, e);
        missingSecrets.push(secret);
      }
    }

    if (missingSecrets.length > 0) {
      throw new EnvironmentError(
        `Could not retrieve required secrets from AWS: ${missingSecrets.join(", ")}.`,
        ErrorType.InvalidData,
        EnvironmentErrorCode.MissingAWSSecrets
      );
    }
  }

  const appEnvironment = stage === "local" || stage === "development" ?
    // return parsed dotenv file in local environment
    dotenv.config({ path: `.env.${stage}` }).parsed as Record<string, string> :
    // otherwise return pre-loaded env for CI/CD
    process.env as Record<string, string>;

  return appEnvironment;
};
