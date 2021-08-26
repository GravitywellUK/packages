import {
  ERROR_CODE_ENUM,
  jsonApiError
} from "@gravitywelluk/json-api-error";
import { createDebug } from "@gravitywelluk/debug";

const debug = createDebug("EMAILS:PREPARE-EMAIL");

/**
 * Populate a html template
 * @param prepareEmailInputs PrepareEmailParams
 */
export const generateHTMLEmail = <D extends Record<string, any>>(htmlTemplate: string, prepareEmailInputs: D): string => {
  debug.info("Preparing email", prepareEmailInputs);

  let finalTemplate = htmlTemplate;
  // Matches anything in curly braces {appUrl}, {username} etc.
  const placeholders = htmlTemplate.match(/\{(.*?)\}/g);

  placeholders?.forEach(placeholder => {
    const placeholderKey = placeholder.substring(1, placeholder.length - 1);
    const replacement = prepareEmailInputs[ placeholderKey ];

    if (!replacement) {
      throw new Error(`${placeholder} is required`);
    }

    if (replacement) {
      finalTemplate = finalTemplate.replace(placeholder, replacement);
    }
  });

  return finalTemplate;
};
