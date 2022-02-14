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

N.B. Make sure you add any new packages to the root `tsconfig.json`!

## Releases

N.B. Do not make manual changes to package versions in `package.json`

Instead, run `yarn release`

This will identify your changest and allow you to define what type of release you want to make for all changed packages.

If other packages depend on these changed packages, the release script will warn you and allow you to re-release all dependent packages with updated dependencies.