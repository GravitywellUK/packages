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
