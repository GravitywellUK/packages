export enum PunctuationMark {
  FULL_STOP = "fullStop",
  EXCLAMATION = "exclamation",
  QUESTION = "question",
  ELLIPSIS = "ellipsis"
}

/**
 * Checks if the given string has the request punctuation mark and adds it to
 * the string if it does not.
 *
 * @param str - The string to add punctuation to
 */
export const punctuate = (str: string, mark: PunctuationMark): string => {
  const characters = str.split(/\w/);
  let punctuationMark: string;

  // Set the punctuation mark according to the request "mark" param
  switch (mark) {
    case PunctuationMark.FULL_STOP:
      punctuationMark = ".";
      break;

    case PunctuationMark.EXCLAMATION:
      punctuationMark = "!";
      break;

    case PunctuationMark.QUESTION:
      punctuationMark = "?";
      break;

    case PunctuationMark.ELLIPSIS:
      punctuationMark = "...";
      break;
  }

  // Return the string as it is, if the end of the string already has the punctuationMark
  if (characters[ characters.length - 1 ] === punctuationMark) {
    return str;
  }

  return `${str}${punctuationMark}`;
};