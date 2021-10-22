<h1 align="center">Gravitywell String-manipulation</h1>
<p align="center">Library of utility functions to manipulate strings</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/string-manipulation" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/string-manipulation" alt="Version" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Usage](#usage)
  - [`formatCurrency`](#formatcurrency)
  - [`punctuate`](#punctuate)
  - [`sentenceCase`](#sentencecase)
  - [`slurlgify`](#slurlgify)
  - [`titleCase`](#titlecase)

## Usage

```typescript
import { <LIB_NAME_HERE> } from "@gravitywelluk/string-manipulation";
```

### `formatCurrency`

Formats the given currency value into a prettified string of the value

```typescript
import { formatCurrency } from "@gravitywelluk/string-manipulation";

formatCurrency(1234567.12);
// Output: "£1,234,567.12"
```

### `punctuate`

Checks if the given string has the request punctuation mark and adds it to the string if it does not.

```typescript
import { punctuate, PunctuationMark } from "@gravitywelluk/string-manipulation";

punctuate("The quick brown fox jumps over the lazy dog", PunctuationMark.FULL_STOP);
// Output: "The quick brown fox jumps over the lazy dog."
```

### `sentenceCase`

Converts a strings 1st letter to uppercase

```typescript
import { sentenceCase } from "@gravitywelluk/string-manipulation";

sentenceCase("the fox JUMPED over Brian's lazy dog");
// Output: "The fox JUMPED over Brian's lazy dog"
```
### `slurlgify`

Converts the given slug into a slugified URL

```typescript
import { slurlgify } from "@gravitywelluk/string-manipulation";

slurlgify("the fox JUMPED over Brian's lazy dog & cat + mouse");
// Output: "the-fox-jumped-over-brians-lazy-dog-and-cat-plus-mouse"
```
### `titleCase`

Converts the given sentence string into title case

```typescript
import { titleCase } from "@gravitywelluk/string-manipulation";

titleCase("the fox JUMPED over brian's lazy dog");
// Output: "The Fox Jumped over Brian's Lazy Dog"
```