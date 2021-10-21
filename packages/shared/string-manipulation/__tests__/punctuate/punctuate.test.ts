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
    expect(punctuate(phrase.noPunctuation, PunctuationMark.FULL_STOP)).toEqual(valid.fullStop);
    expect(punctuate(phrase.noPunctuation, PunctuationMark.EXCLAMATION)).toEqual(valid.exclamationMark);
    expect(punctuate(phrase.noPunctuation, PunctuationMark.QUESTION)).toEqual(valid.questionMark);
    expect(punctuate(phrase.noPunctuation, PunctuationMark.ELLIPSIS)).toEqual(valid.ellipsis);
  });
});
