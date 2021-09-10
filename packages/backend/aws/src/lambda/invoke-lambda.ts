import type AWSModule from "aws-sdk";

import { lambdaConfigure } from "./lambda-configure";
import { AwsError } from "../utils";

/**
 * Invokes a Lambda function.
 *
 * You can invoke a function synchronously (and wait for the response),
 * or asynchronously. To invoke a function asynchronously,
 * set InvocationType to Event.
 *
 * @param invokeParams - The Lambda invoke params
 * @param awsLambdaConfigOverrides - Configuration option overrides
 */
export const invokeLambda = async (
  invokeParams: AWSModule.Lambda.InvocationRequest,
  awsLambdaConfigOverrides: AWSModule.Lambda.ClientConfiguration = {}
): Promise<AWSModule.Lambda.InvocationResponse> => {
  const lambda = lambdaConfigure(awsLambdaConfigOverrides);

  try {
    return await lambda.invoke(invokeParams).promise();
  } catch (error) {
    throw new AwsError(error as AWS.AWSError);
  }
};
