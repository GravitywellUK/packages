import eslintRules from "../rules/eslint";
import typescriptRules from "../rules/typescript";
import reactRules from "../rules/react";
import reactNativeRules from "../rules/react-native";

export = {
  extends: [
    "./configs/eslint",
    "./configs/typescript",
    "./configs/react",
    "./configs/react-native"
  ],
  rules: {
    ...eslintRules,
    ...typescriptRules,
    ...reactRules,
    ...reactNativeRules
  }
};
