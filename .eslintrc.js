// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactLibVersion = require("./packages/frontend/react-components/package.json").dependencies.react;

module.exports = {
  plugins: [ "@gravitywelluk/eslint-plugin" ],
  extends: [ "plugin:@gravitywelluk/typescript-recommended", "plugin:@gravitywelluk/react-recommended" ],
  rules: {
    "no-restricted-imports": "off",
    "import/no-relative-parent-imports": "off"
  },
  settings: { react: { version: reactLibVersion } }
};