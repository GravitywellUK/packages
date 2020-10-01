module.exports = {
  plugins: [ "@gravitywelluk/eslint-plugin" ],
  extends: [ "plugin:@gravitywelluk/typescript-recommended" ],
  rules: {
    "no-restricted-imports": "off",
    "import/no-relative-parent-imports": "off"
  }
};