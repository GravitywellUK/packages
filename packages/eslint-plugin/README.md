<h1 align="center">Gravitywell ESLint Plugin</h1>
<p align="center">Gravitywell defined ESLint rule sets for ESLint.</p>
<p align="center">
  <img src="https://github.com/GravitywellUK/eslint-plugin/workflows/Publish%20post-push%20master/badge.svg" alt="CI" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Getting started / Installation](#getting-started--installation)
- [Usage](#usage)
  - [`@gravitywelluk/eslint-recommended`](#gravitywellukeslint-recommended)
  - [`@gravitywelluk/typescript-recommended`](#gravitywelluktypescript-recommended)
  - [`@gravitywelluk/react-recommended`](#gravitywellukreact-recommended)
  - [`@gravitywelluk/react-native-recommended`](#gravitywellukreact-native-recommended)
- [Contributing](#contributing)

## Getting started / Installation

```
# Yarn
yarn add -D @gravitywelluk/eslint-plugin


# NPM
npm install --save-dev @gravitywelluk/eslint-plugin
```

## Usage

In your `.eslintrc` file, add the package as a plugin.

```
plugins: [ "@gravitywelluk/eslint-plugin" ]
```

There are 4 configurations to choose from:

- `@gravitywelluk/eslint-recommended`
- `@gravitywelluk/typescript-recommended`
- `@gravitywelluk/react-recommended`
- `@gravitywelluk/react-native-recommended`

**Note:** You will only need to **choose ONE from the list above** as they inherit each other. Make sure that it is placed last in the `extends` array.

```
plugins: [ "@gravitywelluk/eslint-plugin" ]
extends: [ "@gravitywelluk/react-recommended" ],
```

### `@gravitywelluk/eslint-recommended`

```
extends: [ "@gravitywelluk/eslint-recommended" ],
```

This includes the following plugins and rules including Gravitywell's own override rules:

- eslint
  - eslint:recommended
- eslint-plugin-import
  - plugin:import/errors
  - plugin:import/warnings

### `@gravitywelluk/typescript-recommended`

```
extends: [ "@gravitywelluk/typescript-recommended" ],
```

This includes `@gravitywelluk/eslint-recommended` and the following plugins and rules :

- @gravitywelluk/eslint-recommended
- @typescript-eslint/eslint-plugin
  - plugin:@typescript-eslint/eslint-recommended
  - plugin:@typescript-eslint/recommended
- eslint-plugin-import
  - plugin:import/typescript

### `@gravitywelluk/react-recommended`

```
extends: [ "@gravitywelluk/react-recommended" ],
```

This includes `@gravitywelluk/typescript-recommended` and the following plugins and rules:

- @gravitywelluk/typescript-recommended
- react
  - plugin:react/recommended
- react-hooks
  - plugin:react-hooks/recommended

### `@gravitywelluk/react-native-recommended`

```
extends: [ "@gravitywelluk/react-native-recommended" ],
```

This includes `@gravitywelluk/react-recommended` and the following plugins and rules :

- @gravitywelluk/react-recommended
- @react-native-community/eslint-config

## Contributing

To contribute to this package you will need to first setup access to NPM packages.

1. You will firstly need to create an NPM **Access Token**. Use the following link on [Creating and viewing authentication tokens](https://docs.npmjs.com/creating-and-viewing-authentication-tokens).

2. You will then need to add the following to your `~/.npmrc` file.
   ```
   //registry.npmjs.org/:_authToken=ACCESS_TOKEN
   ```
3. Contribute using the **Git Truck** flow (`pull-request` > `master`).

**Note:** Publishing is automated via a CI workflow.