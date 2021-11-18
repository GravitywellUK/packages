import sharp from "sharp";

export interface MediaOptimiserAttributes {
  fileName: string;
  fileBuffer: Buffer;
  formats?: Array<keyof sharp.FormatEnum> | sharp.AvailableFormatInfo[];
  sizes?: number[];
}

export interface OptimisedMedia {
  key: string;
  optimisedImage: Buffer;
  format: keyof sharp.FormatEnum | sharp.AvailableFormatInfo;
  size: number;
}

export const optimiseMedia = async ({
  fileName,
  fileBuffer,
  formats = [
    "webp",
    "avif",
    "jpeg"
  ],
  sizes = [
    375,
    600,
    960,
    1200
  ]
}: MediaOptimiserAttributes): Promise<any> => {
  const optimisedMedia: OptimisedMedia[] = [];

  for await (const format of formats) {
    for await (const size of sizes) {
      const optimisedImage = await sharp(fileBuffer).resize({ width: size }).withMetadata().toFormat(format).toBuffer();

      const mediaObj = {
        key: `${format}/${size}/${fileName}.${format}`,
        optimisedImage,
        format,
        size
      };

      optimisedMedia.push(mediaObj);
    }
  }

  return optimisedMedia;
};
