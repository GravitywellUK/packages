/**
 * Converts a strings 1st letter to uppercase
 */
export const sentenceCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};
