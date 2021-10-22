import { formatCurrency } from "../../src";
import { formatCurrencyFixtures } from "../../__fixtures__";

describe("@gravitywelluk/string-manipulations/formatCurrency tests", function () {
  const { phrase, valid } = formatCurrencyFixtures;

  /**
   * Valid
   */
  test("Valid formatCurrency", () => {
    expect(formatCurrency(phrase.decimal, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })).toEqual(valid.decimal0GBP);
    expect(formatCurrency(phrase.decimal)).toEqual(valid.decimal2GBP);
    expect(formatCurrency(phrase.decimal, { currency: "USD" })).toEqual(valid.decimal2USD);
    expect(formatCurrency(phrase.decimal, { currency: "EUR" })).toEqual(valid.decimal2EUR);
    expect(formatCurrency(phrase.decimal, { maximumFractionDigits: 3 })).toEqual(valid.decimal3GBP);
    expect(formatCurrency(phrase.string)).toEqual(valid.string);
  });
});
