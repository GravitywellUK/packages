import { phoneInternationalE164Regex } from "../../src";
import { phoneFixtures } from "../../__fixtures__";

describe("@gravitywelluk/regex/phoneInternationalE164Regex - International (E.164) phone number tests", function () {
  const { valid, invalid } = phoneFixtures.internationalE164;

  /**
   * Valid
   */

  test("Valid international (E.164) phone number with zero", () => {
    expect(phoneInternationalE164Regex.test(valid.withZero)).toBeTruthy();
  });

  test("Valid international (E.164) phone number without zero", () => {
    expect(phoneInternationalE164Regex.test(valid.withoutZero)).toBeTruthy();
  });

  test("Valid international (E.164) US phone number", () => {
    expect(phoneInternationalE164Regex.test(valid.usNumber)).toBeTruthy();
  });

  test("Valid international (E.164) Thai phone number", () => {
    expect(phoneInternationalE164Regex.test(valid.thaiNumber)).toBeTruthy();
  });

  /**
   * Invalid
   */

  test("Invalid international (E.164) phone number without country code", () => {
    expect(phoneInternationalE164Regex.test(invalid.withoutCountryCode)).toBeFalsy();
  });

  test("Invalid international (E.164) phone number with double plus country code", () => {
    expect(phoneInternationalE164Regex.test(invalid.doublePlusCountryCode)).toBeFalsy();
  });
});
