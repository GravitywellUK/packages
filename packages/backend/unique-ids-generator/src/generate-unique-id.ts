import { createDebug } from "@gravitywelluk/debug";

const debug = createDebug("UNIQUE_IDS_GENERATOR:GENERATE-UNIQUE-ID");

interface GenerateUniqIdParams {
  length?: number;
  dictionary?: string;
}

/**
 * Function for generating unique ids
 * @param params {length: defaults to 4, dictionary: using a default dictionary}
 * @returns a unique id
 */
export const generateUniqueId = (params: GenerateUniqIdParams): string => {
  debug.info("Will generate unique id");

  // Set default values
  const DEFAULT_DICTIONARY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const DEFAULT_LENGTH = 4;
  const { length = DEFAULT_LENGTH, dictionary = DEFAULT_DICTIONARY } = params;
  let uniqueId = "";
  const charactersLength = dictionary.length;
  let counter = 0;

  while (counter < length) {
    uniqueId += dictionary.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return uniqueId;
};