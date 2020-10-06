import eslintRules from "../rules/eslint";
import typescriptRules from "../rules/typescript";

export = {
  extends: [ "./configs/eslint", "./configs/typescript" ],
  rules: {
    ...eslintRules,
    ...typescriptRules
  }
};
