import * as AWS from "aws-sdk";

import { awsError } from "../utils/aws-error";
import { lambdaConfigure } from "./lambda-configure";

/**
  * Invokes a Lambda function.
  *
  * You can invoke a function synchronously (and wait for the response),
  * or asynchronously. To invoke a function asynchronously,
  * set InvocationType to Event.
  */
export const invokeLambda = async (
  invokeParams: AWS.Lambda.InvocationRequest,
  configOverrides: AWS.Lambda.ClientConfiguration = {}
): Promise<AWS.Lambda.InvocationResponse> => {
  const lambda = lambdaConfigure(configOverrides);

  try {
    return await lambda.invoke(invokeParams).promise();
  } catch (error) {
    throw awsError(error, {
      environment: process.env.ENVIRONMENT,
      functionName: "invokeLambda"
    });
  }
};