<h1 align="center">Gravitywell Packages</h1>
<p align="center">Gravitywell's own Library of public open-source packages.</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Contributing](#contributing)

## Contributing

Run `yarn initialise`

Make sure you add any new packages to the root `tsconfig.json`!

## Releases

Do not make manual changes to package versions in `package.json`. Instead, run `yarn release`

This will identify your changest and allow you to define what type of release you want to make for all changed packages. You will also be given the choice to create new releases for all dependent workspace packages.

### Important
The generated release definition YAML file in `.yarn/versions` needs to be committed as part of any PR or the release workflow will throw an error