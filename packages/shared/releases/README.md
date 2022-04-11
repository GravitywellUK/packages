<h1 align="center">Gravitywell Releases</h1>
<p align="center">Library of commonly used Regular Expressions</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/releases" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/releases" alt="Version" />
</p>
<br />

## Getting Started

1. Ensure you have the GitHub CLI installed
    - `brew install gh`
2. Install the package
    - `yarn add -D @gravitywelluk/releases`

## Usage

Bump package.json and create/update release branch to match
```bash
gw-releases init
```

Create a tagged GitHub release with automatically generated changelog
```bash
gw-releases publish
```
