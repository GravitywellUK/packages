import { phoneUkBasedRegex } from "../../src";
import { phoneFixtures } from "../../__fixtures__";

describe("@gravitywelluk/regex/phoneUkBasedRegex - UK based phone number tests", function () {
  const { valid, invalid } = phoneFixtures.ukBased;

  /**
   * Valid
   */

  test("Valid UK based phone number with country code", () => {
    expect(phoneUkBasedRegex.test(valid.withCountryCode)).toBeTruthy();
  });

  test("Valid UK based phone number without country code", () => {
    expect(phoneUkBasedRegex.test(valid.withoutCountryCode)).toBeTruthy();
  });

  test("Valid UK based mobile phone number", () => {
    expect(phoneUkBasedRegex.test(valid.mobile)).toBeTruthy();
  });

  /**
   * Invalid
   */

  test("Invalid UK based phone number with to fewer digits", () => {
    expect(phoneUkBasedRegex.test(invalid.toFewerDigits)).toBeFalsy();
  });

  test("Invalid UK based phone number with to many digits", () => {
    expect(phoneUkBasedRegex.test(invalid.toManyDigits)).toBeFalsy();
  });

  test("Invalid US based phone number", () => {
    expect(phoneUkBasedRegex.test(invalid.usCountryCode)).toBeFalsy();
  });
});
