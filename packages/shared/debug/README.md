<h1 align="center">Gravitywell debug</h1>
<p align="center">Library for better debug logs</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/debug" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/debug" alt="Version" />
</p>
<br />

## Usage

```typescript
import createDebug from "@gravitywelluk/debug";

const logger = createDebug("NAME_SPACE");

logger.info("info");
logger.log("log");
logger.error(new Error("Error));
```


