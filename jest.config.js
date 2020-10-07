const { resolve } = require("path");

const { defaults } = require("jest-config");

module.exports = {
  name: "gravitywell-library",
  verbose: true,
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: true
    }
  },
  moduleFileExtensions: [ ...defaults.moduleFileExtensions ],
  testTimeout: 10000,
  testEnvironment: "node",
  testMatch: [ resolve("**/*.test.ts") ]
};
