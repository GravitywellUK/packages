<h1 align="center">Gravitywell Media Optimiser</h1>
<p align="center">Library of tools to optimise and format media</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/media-optimiser" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/media-optimiser" alt="Version" />
</p>
<br />

## Usage

```typescript
const mediaOptimiser = require('media-optimiser');

const transformedMedia = mediaOptimiser.optimiseMedia({
  fileName,
  fileBuffer
})
```

## Prerequisites
Check prerequisites in https://sharp.pixelplumbing.com/install

Supports reading: JPEG, PNG, WebP, AVIF, TIFF, GIF and SVG images.

Default formats: JPEG, PNG, WebP, AVIF and TIFF.

## On Lambda
You'll need to deploy a lambda layer with prebuilt  binaries in order to run this package on Lambda.

If using Serverless Stack, then follow these steps to replace the node_modules version of Sharp with a Lambda Layer:

**Build the Layer**

Add a pre-built Sharp layer zip file to your project, somewhere like `layers/sharp`. Use the zip file from [here](https://github.com/Umkus/lambda-layer-sharp/releases) or build your own version with any customisations you need (additional fonts for example).

**Reference the layer in your Lambda**

Then reference the layer in your function. Exclude Sharp by defining it in your `externalModules` and then add your layer. This must be an unzipped folder, so unzip the file as part of your CI flow.
```js
const mediaOptimiser = new sst.Function(this, "media-optimiser", {
      handler: "services/core/src/media-optimiser/media-optimiser.handler",
      functionName: `${scope.stage}-${scope.name}-media-optimiser`,
      timeout: 120,
      bundle: { externalModules: [ "sharp" ] },
      layers: process.env.ENVIRONMENT !== "development" ? [ new LayerVersion(this, "sharp", { code: Code.fromAsset("layers/sharp") }) ] : undefined,
      permissions: [
        "lambda:InvokeFunction",
        "s3:*",
        "secretsmanager:GetSecretValue"
      ]
    });
```

To unzip the folder add the following step to your `Jenkinsfile`, after installing dependencies:
```
stage("Unzip the Sharp lambda layer") {
    steps {
      sh "unzip layers/sharp/nodejs.zip -d layers/sharp"
    }
  }
```


To run locally you'll still need sharp on your local machine - this is probably best added to dev dependencies: 
```
yarn add -D sharp
```