export = {
  "react/jsx-indent": [
    "error",
    2,
    {
      checkAttributes: true,
      indentLogicalExpressions: true
    }
  ],
  "react/jsx-indent-props": [ "error", 2 ],
  "react/jsx-fragments": [ "error", "syntax" ],
  "react/jsx-one-expression-per-line": [ "error", { allow: "none" } ],
  "react/prop-types": [ "off" ],
  "react/display-name": [ "off" ],
  "react/no-unescaped-entities": [ "off" ],
  "react/no-array-index-key": [ "error" ],
  "react/no-children-prop": [ "off" ],
  "react/jsx-curly-brace-presence": [
    "error",
    {
      props: "never",
      children: "never"
    }
  ],
  "react/jsx-curly-newline": [
    "error",
    {
      multiline: "consistent",
      singleline: "consistent"
    }
  ],
  "react/jsx-curly-spacing": [
    "error",
    {
      when: "never",
      allowMultiline: false,
      children: true
    }
  ],
  "react/jsx-boolean-value": [ "error", "never" ],
  "react/jsx-closing-tag-location": [ "error" ],
  "react/jsx-closing-bracket-location": [ "error", "tag-aligned" ],
  "react/jsx-tag-spacing": [
    "error",
    {
      closingSlash: "never",
      beforeSelfClosing: "always",
      afterOpening: "never",
      beforeClosing: "never"
    }
  ],
  "react/style-prop-object": [ "error" ],
  "react/jsx-max-props-per-line": [
    "error",
    {
      when: "multiline",
      maximum: 1
    }
  ],
  "react/jsx-first-prop-new-line": [ "error", "multiline" ],
  "react/jsx-wrap-multilines": [
    "error",
    {
      declaration: "parens-new-line",
      assignment: "parens-new-line",
      return: "parens-new-line",
      arrow: "parens-new-line",
      condition: "parens-new-line",
      logical: "parens-new-line",
      prop: "parens-new-line"
    }
  ],
  "react-hooks/rules-of-hooks": [ "error" ],
  "react-hooks/exhaustive-deps": [ "error" ]
};
