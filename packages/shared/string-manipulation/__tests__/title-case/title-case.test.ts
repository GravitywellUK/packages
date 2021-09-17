import { titleCase } from "../../src";
import { titleCaseFixtures } from "../../__fixtures__";

describe("@gravitywelluk/string-manipulations/titleCase - Title case tests", function () {
  const { phrase, valid } = titleCaseFixtures;

  /**
   * Valid
   */
  test("Valid title case", () => {
    expect(titleCase(phrase.hello)).toEqual(valid.hello);
    expect(titleCase(phrase.helloUpper)).toEqual(valid.hello);
    expect(titleCase(phrase.helloUpperLower)).toEqual(valid.hello);
    expect(titleCase(phrase.sentence)).toEqual(valid.sentence);
    expect(titleCase(phrase.stopWords)).toEqual(valid.stopWords);
    expect(titleCase(phrase.irish)).toEqual(valid.irish);
  });
});
