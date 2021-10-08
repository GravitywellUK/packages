import slugify from "slugify";

interface SlurlgifyOptionAttributes {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

/**
 * Converts the given slug into a slugified URL
 *
 * @param slug - The slug to URL slugify
 * @param opts - Slugify override options
 */
const slurlgify = (slug: string, opts: SlurlgifyOptionAttributes = {}): string => {
  // Load our character replacement extensions
  slugify.extend(characterReplacements);

  return slugify(slug, {
    replacement: "-",
    lower: true,
    strict: true,
    trim: true,
    ...opts
  });
};

export default slurlgify;

const characterReplacements: Record<string, string> = { "+": "plus" };