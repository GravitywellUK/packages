/**
 * Converts the given sentence string into title case
 */
const titleCase = (str: string): string => {
  const stopWordsThreeOrMore = [ "and", "are" ];
  const words = str.match(/\w\S*/g);

  // If there are no words found, return what was given (fail gracefully)
  if (!words || words && words.length === 0) {
    return str;
  }

  // Replace each word
  const parsedWords = words.map((word, i) => {
    // Always uppercase the first word.
    if (i === 0) {
      word = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    } else {
      // If the word is 3 more characters long and it does not match one of
      // the stopWordsThreeOrMore, uppercase the first character.
      if (word.length >= 3 && !stopWordsThreeOrMore.includes(word)) {
        word = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }

      // If the word is an irish name (O'brian) uppercase the character after the ' (apostrophe)
      if (word.match(/^\w{1}'{1}\w{3,}$/g)) {
        word = word.replace(/(?<=')\w/g, charAfterApos => charAfterApos.toUpperCase());
      }
    }

    return word;
  });

  return parsedWords.join(" ");
};

export default titleCase;
