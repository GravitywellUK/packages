<h1 align="center">Gravitywell Unique ids Generator</h1>
<p align="center">Library for generating unique ids</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/unique-ids-generator" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/unique-ids-generator" alt="Version" />
</p>
<br />

## Usage
> Defaults to a length of 4 and a default dictionary containing capital and lowercase letters and digits 0-9
```typescript
const uniqueIdsGenerator = require('unique-ids-generator');

// Example:
const uniqueId = uniqueIdsGenerator.generateUniqueId({
  length: 5,
  dictionary: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
})
```
