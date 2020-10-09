/**
 * Phone international (E.164) regex
 *
 * @see https://support.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers
 */
export const phoneInternationalE164Regex = /^(\+[0-9]{1,2})([0-9]{10,11})$/g;