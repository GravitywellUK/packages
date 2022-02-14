import { RuleTargetInput } from "@aws-cdk/aws-events";
import * as cdk from "@aws-cdk/core";
import * as sst from "@serverless-stack/resources";

/**
 * Configures EventBridge to send a keep warm event every 15 minutes.
 * This should prevent cold starts and minimise average request latency
 */
export const keepLambdaWarm = (stack: cdk.Construct, name: string, lambda: sst.Function): void => {
  new sst.Cron(stack, `${name}-keep-warm`, {
    schedule: `rate(${lambda.isBoundToVpc ? 15 : 5} minutes)`,
    job: {
      function: lambda,
      description: `Keep ${lambda.functionName} warm to avoid cold start delays`,
      jobProps: { event: RuleTargetInput.fromObject({ type: "warmup" }) }
    }
  });
};

// strips all non alphanumeric characters out and returns an ID-friendly kebab case name
const formatRouteKey = (route: string) => route.replace(/\W+/g, "-").replace(/\W+$/, "");

/**
 * Loops through all routes in the API and configures EventBridge
 * to ping each lambda every 15 minutes. This should prevent cold starts
 * and minimise average request latency
 */
export const keepEndpointsWarm = (stack: cdk.Construct, api: sst.ApiGatewayV1Api): void => {
  for (const route of api.routes) {
    const routeLambda = api.getFunction(route);

    if (routeLambda) {
      keepLambdaWarm(stack, formatRouteKey(route), routeLambda);
    }
  }
};
