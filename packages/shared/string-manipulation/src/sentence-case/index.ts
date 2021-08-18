/**
 * Converts a strings 1st letter to uppercase
 */
const sentenceCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export default sentenceCase;
