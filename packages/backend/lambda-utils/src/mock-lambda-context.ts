import * as uuid from "uuid";
import { Context } from "aws-lambda";

interface ContextOptions {
	region?: string;
	account?: string;
	alias?: string;
	functionName?: string;
	functionVersion?: string;
	memoryLimitInMB?: string;
	timeout?: number;
}

export const createContext = (config?: ContextOptions): Context => {
  const id = uuid.v1();
  const stream = uuid.v4().replace(/-/g, "");
  const timeout = config?.timeout || 10;
  const region = config?.region || "us-east-1";
  const functionName = config?.functionName || "foo";
  const functionVersion = config?.functionVersion || "$LATEST";
  const memoryLimitInMB = config?.memoryLimitInMB || "128";
  const account = config?.account || 123456789012;
  const start = new Date();

  const ctx = {
    succeed: () => {
      throw new Error("This is no longer supported, use callbacks instead");
    },
    fail: () => {
      throw new Error("This is no longer supported, use callbacks instead");
    },
    done: () => {
      throw new Error("This is no longer supported, use callbacks instead");
    },
    getRemainingTimeInMillis: () => {
      const current = new Date();
      const remaining = (current.getTime() + timeout * 1000) - start.getTime();

      return Math.max(0, remaining);
    },
    callbackWaitsForEmptyEventLoop: true,
    functionName,
    functionVersion,
    memoryLimitInMB,
    awsRequestId: id,
    logGroupName: `/aws/lambda/${functionName}`,
    logStreamName: `${new Date()}/[${functionVersion}]/${stream}`,
    timeout,
    invokedFunctionArn: `arn:aws:lambda:${region}:${account}:function:${functionName}:${functionVersion}`
  };

  return ctx;
};