import fs from "fs";
import path from "path";

import sharp from "sharp";

import { optimiseMedia } from "../src/media-optimiser";

describe("media-optimise", () => {
  test("Can optimise media without defining formats nor sizes (from png)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/png_image.png"));

    const optimisedMedia = await optimiseMedia({
      fileName: "png_image",
      fileBuffer: file
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from jpeg)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/jpeg_image.jpeg"));

    const optimisedMedia = await optimiseMedia({
      fileName: "svg_image",
      fileBuffer: file,
      formats: [
        "png",
        "webp",
        "avif",
        "tiff"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from png)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/png_image.png"));

    const optimisedMedia = await optimiseMedia({
      fileName: "png_image",
      fileBuffer: file,
      formats: [
        "jpeg",
        "webp",
        "avif",
        "tiff"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from webp)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/webp_image.webp"));

    const optimisedMedia = await optimiseMedia({
      fileName: "webp_image",
      fileBuffer: file,
      formats: [
        "jpeg",
        "png",
        "avif",
        "tiff"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from avif)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/avif_image.avif"));

    const optimisedMedia = await optimiseMedia({
      fileName: "avif_image",
      fileBuffer: file,
      formats: [
        "jpeg",
        "png",
        "webp",
        "tiff"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from gif)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/gif_image.gif"));

    const optimisedMedia = await optimiseMedia({
      fileName: "gif_image",
      fileBuffer: file,
      formats: [
        "jpeg",
        "png",
        "avif",
        "webp",
        "tiff"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from tiff)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/tiff_image.tiff"));

    const optimisedMedia = await optimiseMedia({
      fileName: "gif_image",
      fileBuffer: file,
      formats: [
        "jpeg",
        "png",
        "avif",
        "webp"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);

  test("Can optimise media for all default formats (from svg)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/svg_image.svg"));

    const optimisedMedia = await optimiseMedia({
      fileName: "svg_image",
      fileBuffer: file,
      formats: [
        "jpeg",
        "png",
        "webp",
        "avif",
        "tiff"
      ],
      sizes: [ 600 ]
    });

    for await (const media of optimisedMedia) {
      const metadata = await sharp(media.optimisedImage).metadata();

      // AVIF images have "heif" format
      if (media.format === "avif") {
        expect(metadata.format).toBe("heif");
        expect(metadata.compression).toBe("av1");
      } else {
        expect(metadata.format).toBe(media.format);
      }

      expect(metadata.width).toBe(media.size);
    }
  }, 30000);
});