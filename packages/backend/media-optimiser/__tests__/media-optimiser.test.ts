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

  test("Can optimise media with formats and sizes (from png)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/png_image.png"));

    const optimisedMedia = await optimiseMedia({
      fileName: "png_image",
      fileBuffer: file,
      formats: [ "avif", "webp" ],
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

  test("Can optimise media with formats and sizes (from heic)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/heic_image.heic"));

    const optimisedMedia = await optimiseMedia({
      fileName: "heic_image",
      fileBuffer: file,
      formats: [ "avif", "webp" ],
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

  test("Can optimise media with formats and sizes (from jpg)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/jpg_image.jpg"));

    const optimisedMedia = await optimiseMedia({
      fileName: "jpg_image",
      fileBuffer: file,
      formats: [ "avif", "webp" ],
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

  test("Can optimise media with formats and sizes (from avif)", async () => {
    const file = fs.readFileSync(path.resolve(__dirname, "../assets/avif_image.avif"));

    const optimisedMedia = await optimiseMedia({
      fileName: "avif_image",
      fileBuffer: file,
      formats: [ "webp", "heif" ],
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