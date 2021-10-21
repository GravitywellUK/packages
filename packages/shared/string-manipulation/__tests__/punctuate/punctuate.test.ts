import {
  punctuate,
  PunctuationMark
} from "../../src";
import { punctuateFixtures } from "../../__fixtures__";

describe("@gravitywelluk/string-manipulations/punctuate tests", function () {
  const { phrase, valid } = punctuateFixtures;

  /**
   * Valid
   */
  test("Valid punctuate", () => {
    // Full stop
    expect(punctuate(phrase.noPunctuation, PunctuationMark.FULL_STOP)).toEqual(valid.fullStop);
    expect(punctuate(phrase.fullStop, PunctuationMark.FULL_STOP)).toEqual(valid.fullStop);
    // Exclamation mark
    expect(punctuate(phrase.noPunctuation, PunctuationMark.EXCLAMATION)).toEqual(valid.exclamationMark);
    expect(punctuate(phrase.exclamationMark, PunctuationMark.EXCLAMATION)).toEqual(valid.exclamationMark);
    // Question mark
    expect(punctuate(phrase.noPunctuation, PunctuationMark.QUESTION)).toEqual(valid.questionMark);
    expect(punctuate(phrase.questionMark, PunctuationMark.QUESTION)).toEqual(valid.questionMark);
    // Ellipsis
    expect(punctuate(phrase.noPunctuation, PunctuationMark.ELLIPSIS)).toEqual(valid.ellipsis);
    expect(punctuate(phrase.ellipsis, PunctuationMark.ELLIPSIS)).toEqual(valid.ellipsis);
  });
});
