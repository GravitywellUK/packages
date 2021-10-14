<h1 align="center">Gravitywell Environment Validation</h1>
<p align="center">Library to handle environment variable and secret validation</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/environment" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/environment" alt="Version" />
</p>
<br />

## Usage

Use at a convenient entry point to check that your environment is setup correctly (Webpack config, Serverless Stack deployment etc.)

```typescript
import { validateAppEnvironment } from "@gravitywelluk/environment";

await validateAppEnvironment(process.env.ENVIRONMENT, {
  variables: [
    // sequelize (local dev)
    "DB_DATABASE",
    "DB_HOST",
    "DB_PORT",
    "DB_ENGINE",
    "DB_USERNAME",
    "DB_PASSWORD",
    // aws
    "REGION",
    // external apis
    "SOME_API_KEY"
  ],
  // put AWS Secret ARNs here for backend projects
  awsSecrets: [
    "DB_SECRET_ARN"
  ]
});
```

This validation function will throw an error if required variables are not found. Secrets will also be checked to see if they exist in AWS Secrets Manager.