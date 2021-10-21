import { titleCase as titleCasePkg } from "title-case";

/**
 * Converts the given sentence string into title case
 */
export const titleCase = (str: string): string => {
  const parsedStr = titleCasePkg(str.toLowerCase());
  const words = parsedStr.match(/\w\S*/g);

  // If there are no words found, return what was given (fail gracefully)
  if (!words || words && words.length === 0) {
    return parsedStr;
  }

  // Additional word replacement
  const parsedWords = words.map((word, i) => {
    // If the word is an irish name (O'brian) uppercase the character after the ' (apostrophe)
    if (word.match(/^\w{1}'{1}\w{3,}$/g)) {
      word = word.replace(/(?<=')\w/g, charAfterApos => charAfterApos.toUpperCase());
    }

    return word;
  });

  return parsedWords.join(" ");
};
