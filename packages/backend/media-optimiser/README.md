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
