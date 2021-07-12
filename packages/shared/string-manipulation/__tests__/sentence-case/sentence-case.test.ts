import { sentenceCase } from "../../src";
import { sentenceCaseFixtures } from "../../__fixtures__";

describe("@gravitywelluk/string-manipulations/sentenceCase - Sentance case tests", function () {
  const { phrase, valid } = sentenceCaseFixtures;

  /**
   * Valid
   */

  test("Valid sentence case", () => {
    expect(sentenceCase(phrase.hello)).toEqual(valid.hello);
    expect(sentenceCase(phrase.helloUpper)).toEqual(valid.hello);
    expect(sentenceCase(phrase.helloUpperLower)).toEqual(valid.helloUpperLower);
    expect(sentenceCase(phrase.sentence)).toEqual(valid.sentence);
  });
});
