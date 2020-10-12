// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactLibVersion = require("./packages/frontend/react-components/package.json").dependencies.react;

module.exports = {
  plugins: [ "@gravitywelluk/eslint-plugin" ],
  extends: [ "plugin:@gravitywelluk/react-recommended" ],
  settings: { react: { version: reactLibVersion } },
  rules: {
    "no-restricted-imports": "off",
    "import/no-relative-parent-imports": "off"
  }
};