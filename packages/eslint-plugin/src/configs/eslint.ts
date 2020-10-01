export = {
  env: { es6: true },
  plugins: [ "import" ],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  overrides: [
    {
      files: [ "*.js" ],
      rules: { "no-undef": "off" }
    }
  ]
};