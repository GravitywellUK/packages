<h1 align="center">Gravitywell React Hooks</h1>
<p align="center">Library of commonly used React hooks</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/react-hooks" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/react-hooks" alt="Version" />
</p>
<br />

## Usage

```typescript
import { <LIB_NAME_HERE> } from "@gravitywelluk/react-hooks";
```

## Table of Contents
- [Usage](#usage)
- [Table of Contents](#table-of-contents)
- [`useDebounce`](#usedebounce)
- [`useWindowDimensions`](#usewindowdimensions)

## `useDebounce`

A hook that returns a value once the `inputValue` has stopped mutating after a set amount of time.

```typescript
import { useDebounce } from "@gravitywelluk/react-hooks";

const debouncedInputValue = useDebounce<string>(inputValue, 800);
```


## `useWindowDimensions`

A hook that returns an object containing the `width` and `height` of the device's window dimensions.

```typescript
import { useWindowDimensions } from "@gravitywelluk/react-hooks";

const windowDimension = useWindowDimensions();

/* Output:

{
  width: 320,
  height: 568
}

*/
```
