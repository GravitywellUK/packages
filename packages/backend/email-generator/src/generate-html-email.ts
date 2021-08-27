import { createDebug } from "@gravitywelluk/debug";

const debug = createDebug("EMAILS:PREPARE-EMAIL");

/**
 * Populate a html template replacing handlebar style values with your named values
 *
 * @param htmlTemplate The html string template
 * @param emailData The email data to load into the template
 *
 * @returns interpolated email string template
 */
export const generateHTMLEmail = <D extends Record<string, any>>(htmlTemplate: string, emailData: D): string => {
  debug.info("Preparing email", emailData);

  let finalTemplate = htmlTemplate;
  // Matches anything in curly braces {appUrl}, {username} etc.
  const placeholders = htmlTemplate.match(/\{%(.*?)%\}/g);

  placeholders?.forEach(placeholder => {
    const placeholderKey = placeholder.substring(2, placeholder.length - 2);
    const replacement = emailData[ placeholderKey ];

    if (!replacement) {
      throw new Error(`${placeholder} is required`);
    }

    if (replacement) {
      finalTemplate = finalTemplate.replace(placeholder, replacement);
    }
  });

  return finalTemplate;
};
