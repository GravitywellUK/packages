<h1 align="center">Gravitywell Regex</h1>
<p align="center">Library of commonly used Regular Expressions</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/regex" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/regex" alt="Version" />
</p>
<br />

## Usage

```typescript
import { <REGEX_NAME_HERE> } from "@gravitywelluk/regex";
```

## Table of Contents
- [Usage](#usage)
- [Table of Contents](#table-of-contents)
- [Email regex](#email-regex)
  - [`globalEmailRegex`](#globalemailregex)
- [Phone number regex](#phone-number-regex)
  - [`phoneInternationalE164Regex`](#phoneinternationale164regex)
  - [`phoneUkBasedRegex`](#phoneukbasedregex)

## Email regex

### `globalEmailRegex`

Regex for a global email address `conner.o'brian@example.com`

```typescript
import { globalEmailRegex } from "@gravitywelluk/regex";
```

## Phone number regex

### `phoneInternationalE164Regex`

Regex for an international (E.164) phone number `+14155552671`

```typescript
import { phoneInternationalE164Regex } from "@gravitywelluk/regex";
```

### `phoneUkBasedRegex`

Regex for a UK based phone number `+447847584310` or `07847584310`

```typescript
import { phoneUkBasedRegex } from "@gravitywelluk/regex";
```

