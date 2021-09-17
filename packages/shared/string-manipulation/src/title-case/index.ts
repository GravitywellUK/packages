import { titleCase as titleCasePkg } from "title-case";

/**
 * Converts the given sentence string into title case
 */
const titleCase = (str: string): string => {
  return titleCasePkg(str.toLowerCase());
};

export default titleCase;
