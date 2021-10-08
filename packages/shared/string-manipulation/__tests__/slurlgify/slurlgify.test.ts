import { slurlgify } from "../../src";
import { slurlgifyFixtures } from "../../__fixtures__";

describe("@gravitywelluk/string-manipulations/slurlgify tests", function () {
  const { phrase, valid } = slurlgifyFixtures;

  /**
   * Valid
   */
  test("Valid slurlgify", () => {
    expect(slurlgify(phrase.exampleOne)).toEqual(valid.exampleOne);
    expect(slurlgify(phrase.exampleTwo)).toEqual(valid.exampleTwo);
    expect(slurlgify(phrase.exampleThree)).toEqual(valid.exampleThree);
  });
});
