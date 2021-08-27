<h1 align="center">Gravitywell email generator</h1>
<p align="center">A library to help generate email templates</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/email-generator" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/email-generator" alt="Version" />
</p>
<br />

## Usage

```typescript
import template from "./local/path/template.html";
import { generateHtmlEmail } from "email-generator";

interface EmailParams {
  name: string;
}

generateHtmlEmail<EmailParams>(template, { name: "Joe bloggs" });
```

## TODO

- Better validation
- mjml templates
