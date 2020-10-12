import { globalEmailRegex } from "../../src";
import { emailFixtures } from "../../__fixtures__";

describe("@gravitywelluk/regex/globalEmailRegex - Global email tests", function () {
  const { valid, invalid } = emailFixtures.globalEmail;

  /**
   * Valid
   */

  test("Valid global email address standard", () => {
    expect(globalEmailRegex.test(valid.standard)).toBeTruthy();
  });

  test("Valid global email address standard with dot", () => {
    expect(globalEmailRegex.test(valid.standardWithDot)).toBeTruthy();
  });

  test("Valid global email address standard with plus", () => {
    expect(globalEmailRegex.test(valid.standardWithPlus)).toBeTruthy();
  });

  test("Valid global email address standard with dot and plus", () => {
    expect(globalEmailRegex.test(valid.standardWithDotPlus)).toBeTruthy();
  });

  test("Valid global email address standard with dot, plus and numbers", () => {
    expect(globalEmailRegex.test(valid.standardWithDotPlusNumbers)).toBeTruthy();
  });

  test("Valid global email address irish", () => {
    expect(globalEmailRegex.test(valid.irish)).toBeTruthy();
  });

  test("Valid global email address irish", () => {
    expect(globalEmailRegex.test(valid.irish)).toBeTruthy();
  });

  test("Valid global email address with domain hyphen", () => {
    expect(globalEmailRegex.test(valid.withDomainHypen)).toBeTruthy();
  });

  test("Valid global email address with domain IP (with brackets)", () => {
    expect(globalEmailRegex.test(valid.withDomainIp)).toBeTruthy();
  });

  test("Valid global email address with short domain", () => {
    expect(globalEmailRegex.test(valid.withShortDomain)).toBeTruthy();
  });

  /**
   * Invalid
   */

  test("Invalid global email address with dot first", () => {
    expect(globalEmailRegex.test(invalid.withUserDotFirst)).toBeFalsy();
  });

  test("Invalid global email address with dot last", () => {
    expect(globalEmailRegex.test(invalid.withUserDotLast)).toBeFalsy();
  });

  test("Invalid global email address with space", () => {
    expect(globalEmailRegex.test(invalid.withUserSpace)).toBeFalsy();
  });

  test("Invalid global email address with no domain", () => {
    expect(globalEmailRegex.test(invalid.withNoDomain)).toBeFalsy();
  });

  test("Invalid global email address with domain hyphen first", () => {
    expect(globalEmailRegex.test(invalid.withDomainHypenFirst)).toBeFalsy();
  });

  test("Invalid global email address with domain hyphen last", () => {
    expect(globalEmailRegex.test(invalid.withDomainHypenLast)).toBeFalsy();
  });

  test("Invalid global email address with no user", () => {
    expect(globalEmailRegex.test(invalid.withNoUser)).toBeFalsy();
  });

  test("Invalid global email address with symbol", () => {
    expect(globalEmailRegex.test(invalid.withSymbol)).toBeFalsy();
  });

  test("Invalid global email address wuth hashtag", () => {
    expect(globalEmailRegex.test(invalid.withHashTag)).toBeTruthy();
  });

  test("Invalid global email address with domain IP (without brackets)", () => {
    expect(globalEmailRegex.test(invalid.withDomainIp)).toBeTruthy();
  });

  test("Invalid global email address with comments", () => {
    expect(globalEmailRegex.test(invalid.withComments)).toBeFalsy();
  });

  test("Invalid global email address with space between quotes", () => {
    expect(globalEmailRegex.test(invalid.withSpaceBetweenQuotes)).toBeFalsy();
  });
});
