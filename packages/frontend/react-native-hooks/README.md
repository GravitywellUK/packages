<h1 align="center">Gravitywell React-Native Hooks</h1>
<p align="center">Library of commonly used React-Native hooks</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/react-native-hooks" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/react-native-hooks" alt="Version" />
</p>
<br />

## Usage

```typescript
import { <LIB_NAME_HERE> } from "@gravitywelluk/react-native-hooks";
```

## Table of Contents
- [Usage](#usage)
- [Table of Contents](#table-of-contents)
- [`useAssetLoader`](#useassetloader)

## `useAssetLoader`

A hook that loads each asset into cache.

```typescript
import { useAssetLoader } from "@gravitywelluk/react-native-hooks";

const [ assetsLoaded ] = useAssetLoader([
  require("./path/to/file/example.png"),
  require("./path/to/file/example.jpg")
]);

/* Output:

[ true, null ]

*/
```
