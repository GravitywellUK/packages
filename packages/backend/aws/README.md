<h1 align="center">Gravitywell AWS</h1>
<p align="center">Library of commonly used AWS wrapper functions to communicate with the AWS SDK</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/aws" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/aws" alt="Version" />
</p>
<br />

## Installation

In conjunction with this package, you will need to install the `aws-sdk` library.

```shell
yarn add @gravitywelluk/aws aws-sdk
```

## Usage

```typescript
import { LIB_NAME_HERE } from "@gravitywelluk/aws"

try {
  const s3Object = await getObjectFromS3({
    bucket: "example-bucket",
    path: "path/to/file.jpg"
  });
} catch(error) {
  throw error;
}
```