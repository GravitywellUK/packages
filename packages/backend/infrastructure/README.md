<h1 align="center">Gravitywell Infrastructure Helpers</h1>
<p align="center">Library of helper functions for AWS CDK and Serverless Stack</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/infrastructure" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/infrastructure" alt="Version" />
</p>
<br />

## Installation

In conjunction with this package, you will need to install `@serverless-stack/resources`, `@aws-cdk/aws-apigateway` and `@aws-cdk/aws-events`.

```shell
yarn add @gravitywelluk/infrastructure @serverless-stack/resources @aws-cdk/aws-apigateway @aws-cdk/aws-events
```

## Usage

```typescript
import { configureAuthorizerScope, generateApiPolicyStatement } from "@gravitywelluk/infrastructure";
```

### `configureAuthorizerScope`

Define what API resources are accessible following a successful response from a custom authorizer.

Default scope (`{ allow: [ "/*" ] }`) allows access to all endpoints.

If using multiple authorizers, `scope` can be used to lock down user permissions to the specific endpoints covered by each one.

_IMPORTANT:_ The resource policy returned by an authorizer must be defined inside its handler using the inserted `ALLOWED_API_RESOURCES` and `DENIED_API_RESOURCES` environment variables.

```ts
interface AuthorizerScope {
  allow: string[];
  deny?: string[];
}

type ConfigureAuthorizerScope = (
  app: sst.App,
  api: apig.RestApi,
  authorizer: sst.Function,
  scope: AuthorizerScope = { allow: [ "/*" ] } // Allowed / denied API paths (supports wildcards)
) => void;
```

### `generateApiPolicyStatement`

Utility for generating a scoped IAM resource policy statement for an API Gateway authorizer.
```ts
type GenerateApiPolicyStatement = (scope: AuthorizerScope) => ApiPolicyStatement;
```

### `keepLambdaWarm`

Configures EventBridge to send a keep warm event to the specified lambda every 15 minutes. This should prevent cold starts and minimise average request latency.

```ts
type KeepLambdaWarm = (stack: cdk.Construct, name: string, lambda: sst.Function) => void;

keepLambdaWarm(stack, formatRouteKey(route), routeLambda);
```
### `keepEndpointsWarm`

Loops through all routes in an API and configures EventBridge to ping each handler lambda every 15 minutes. This should prevent cold starts and minimise average request latency.

Applies to all API routes by default. To restrict to a specific set, use `routes`.

```ts
type KeepEndpointsWarm = (stack: cdk.Construct, api: sst.ApiGatewayV1Api, routes?: string[]) => void;
```