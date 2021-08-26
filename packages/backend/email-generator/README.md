<h1 align="center">Gravitywell email generator library</h1>
<p align="center">Library to take html email templates and interpolate values</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/email-generator" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/email-generator" alt="Version" />
</p>
<br />

## Usage

```typescript
const template = require("./local/path/template.html");
const generateHtmlEmail = require("email-generator");
interface EmailParams {
  name: string;
}
generateHtmlEmail<EmailParams>(template, { name: "Joe bloggs" });
```

## TODO

- Better validation
- mjml templates
