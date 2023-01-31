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

const uniqueId = uniqueIdsGenerator.generateUniqueId({
  length: 5,
  dictionary: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
})
```
> A few examples with the default dictionary and length
```
UAvm
N6lx
```

> Number of combinations for the default values
`26 uppercase letters` + `26 lowercase letters` + `10 digits (0 - 9)` = `62 characters`

Therefore `62*62*62*62` = `14,776,336` total possible ids.

## Be aware of
This generator is using `Math.random()` therefore we might end up with the same ids, make sure to ALWAYS check the id before using it somewhere that will require it to be unique.

*For example:*

Before setting it in a db, check that it doesn't exist already.

