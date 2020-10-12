export const phoneFixtures = {
  internationalE164: {
    valid: {
      withZero: "+4402071838750",
      withoutZero: "+442071838750",
      usNumber: "+14155552671",
      thaiNumber: "+6653010660"
    },
    invalid: {
      withoutCountryCode: "02071838750",
      doublePlusCountryCode: "++4402071838750"
    }
  },
  ukBased: {
    valid: {
      withCountryCode: "+442071838750",
      withoutCountryCode: "02071838750",
      mobile: "07843575429"
    },
    invalid: {
      toFewerDigits: "0784357542",
      toManyDigits: "078435754298",
      usCountryCode: "+12071838750"
    }
  }
};