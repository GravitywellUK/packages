/**
 * Formats the given currency value into a prettified string of the value
 *
 * @example
 * expect(formatCurrency(phrase.decimal, {
 *   minimumFractionDigits: 0,
 *   maximumFractionDigits: 0
 * })).toEqual(valid.decimal0GBP);
 *
 * Output: "£1,234,567"
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 * @see https://www.iban.com/country-codes
 * @param value - The monetary value of the currency
 * @param opts - Addition Intl.NumberFormat options
 */
export const formatCurrency = (value: number | string, opts: Omit<Intl.NumberFormatOptions, "style"> = {}): string => {
  const parsedValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-GB", {
    // Default values
    currency: "GBP",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // Overrides
    ...opts,
    // Enforcements
    style: "currency"
  }).format(parsedValue);
};