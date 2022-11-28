<h1 align="center">Gravitywell Error classes</h1>
<p align="center">Library to handle JSON API specification errors</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/error" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/error" alt="Version" />
</p>
<br />

## Usage

### v2

The package allows you to throw consistent errors within your project, without worrying about specific HTTP status codes.

Every HTTP status code (except "I'm a teapot") is available to use, mapped with the `ErrorType` enum. Each enum value is documented with the MDN annotation for the code, to provide an easy view on the code's intended purpose.

If needed, you can define a custom `config` typing, to protect the structure of config you pass into errors. If you don't need this, a `Record<string, unknown>` is configured by default.

#### Example usage

```typescript
throw new APIError(ErrorType.Forbidden, "User is not permitted to access this resource");
```

A detailed example of configuring custom typing for config:

```typescript
// The shape of your error context
interface CustomErrorContext {
  foo: string;
  bar: number;
}

type CustomErrorContextType<D extends keyof CustomErrorContext = keyof CustomErrorContext> = Record<D, CustomErrorContext[D]>;

type CustomProjectError = ApiErrorResponse<CustomErrorContextType>;
```

With this config, the `context` property of your `CustomProjectError` will be fully typed to your specification!

```typescript
const example: CustomProjectError = {
  statusCode: ErrorType.BadGateway,
  title: "something",
  message: "somethingelse",
  // It will error if this doesn't match your CustomErrorContext definition
  context: {
    foo: "f",
    bar: 6
  }
};
```

#### Migrating from v1

:warning: v2 introduces breaking changes - some work will need to be done if you want to use v2 for a project currently using v1.

v2 moves away from custom project error codes, instead including all available HTTP status codes to select from. The syntax has been slightly adjusted to improve readability.

1. Remove custom `ErrorCode` setup (as shown below) and generics. If you still want to have a project-named error, it will now be a simple extension:

```typescript
export default class CustomProjectError extends ApiError{}
```

2. Swap out the currently used `ErrorType` values for those now supported in v2. The naming of these is different, so you may need to refer to the internals of v1 to understand the original error type mappings and convert.

3. Refactor the `ApiError` calls to use the new param order, as shown in the example usage above.

#### Example error api response format

```json
{
  "statusCode": 404,
  "body": {
    "error": {
      "message": "User not found",
      "type": "Forbidden"
    }
  }
}
```

### v1

Within your project you can specify the more project specific error codes, (see the example below)

```typescript
import { ApiError } from "@gravitywelluk/error";

import APIError from "./ApiError";
import { ErrorType } from "./ApiError";

export enum ErrorCode {
  UserNotAllowed = "user_not_allowed",
}

export default class DecarbError extends APIError<ErrorCode> {}
```

Then you can use this class across your project for more consistant error handling:

```typescript
throw new DecarbError(
  "User is not permitted to access that resource",
  ErrorType.Forbidden,
  ErrorCode.UserNotAllowed
);
```

#### Example error api response format

```json
{
  "statusCode": 404,
  "body": {
    "error": {
      "message": "User not found",
      "type": "NOT_FOUND_ERROR"
    }
  }
}
```
