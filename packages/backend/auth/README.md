<h1 align="center">Gravitywell Auth</h1>
<p align="center">A library for auth adapters</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/email-generator" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/email-generator" alt="Version" />
</p>
<br />

## Usage
 

```typescript
import { AppleAdapter } from "./AppleAdapter";

export const handler = AuthHandler({
  providers: {
    apple: AppleAdapter({
      issuer: new Issuer({
        issuer: "https://appleid.apple.com/",
        authorization_endpoint: "https://appleid.apple.com/auth/authorize",
        token_endpoint: "https://appleid.apple.com/auth/token"
      }),
      clientID: Config.CLIENT_ID, // e.g. com.appname.native
      clientSecret: Config.APPLE_CLIENT_SECRET, // Generated from Apple certs
      scope: "name email", // scopes you want access to
      onSuccess: authenticateUser // What to do with the resulting 
    }),
    /// ...other auth adapters
  }
});
```