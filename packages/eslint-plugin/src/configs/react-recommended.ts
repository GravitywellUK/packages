import eslintRules from "../rules/eslint";
import typescriptRules from "../rules/typescript";
import reactRules from "../rules/react";

export = {
  extends: [
    "./configs/eslint",
    "./configs/typescript",
    "./configs/react"
  ],
  rules: {
    ...eslintRules,
    ...typescriptRules,
    ...reactRules
  }
};
