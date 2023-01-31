import { createDebug } from "@gravitywelluk/debug";

const debug = createDebug("UNIQUE_IDS_GENERATOR:GENERATE-UNIQUE-ID");

interface GenerateUniqueIdParams {
  length?: number;
  dictionary?: string;
}

/**
 * Function for generating unique ids
 * @param params {length: defaults to 4, dictionary: using a default dictionary}
 * @returns a unique id
 */
export const generateUniqueId = (params: GenerateUniqueIdParams): string => {
  debug.info("Will generate unique id");

  // Set default values
  const DEFAULT_DICTIONARY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const DEFAULT_LENGTH = 4;
  const { length = DEFAULT_LENGTH, dictionary = DEFAULT_DICTIONARY } = params;
  // Remove duplicates from dictionary
  const cleanDictionary = Array.from(new Set(dictionary)).join("");
  let uniqueId = "";
  const charactersLength = cleanDictionary.length;
  let counter = 0;

  while (counter < length) {
    uniqueId += cleanDictionary.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return uniqueId;
};