export = {
  "prettier/prettier": "off",
  "quotes": [ "error", "double" ],
  "quote-props": [ "error", "consistent-as-needed" ],
  "semi": [ "error", "always" ],
  "semi-style": [ "error", "last" ],
  "indent": [
    "error",
    2,
    {
      SwitchCase: 1,
      flatTernaryExpressions: true,
      ignoredNodes: [
        "JSXFragment",
        "JSXOpeningFragment",
        "JSXClosingFragment",
        "JSXIdentifier",
        "JSXNamespacedName",
        "JSXMemberExpression",
        "JSXEmptyExpression",
        "JSXExpressionContainer",
        "JSXElement",
        "JSXClosingElement",
        "JSXOpeningElement",
        "JSXAttribute",
        "JSXSpreadAttribute",
        "JSXText"
      ]
    }
  ],
  "comma-dangle": [ "error", "never" ],
  "operator-linebreak": [ "error", "after" ],
  "brace-style": [ "error" ],
  "no-multiple-empty-lines": [
    "error",
    {
      max: 1,
      maxBOF: 0,
      maxEOF: 0
    }
  ],
  "padding-line-between-statements": [
    "error",
    {
      blankLine: "always",
      prev: "import",
      next: "*"
    },
    {
      blankLine: "any",
      prev: "import",
      next: "import"
    },
    {
      blankLine: "always",
      prev: "expression",
      next: "export"
    },
    {
      blankLine: "always",
      prev: "*",
      next: "multiline-const"
    },
    {
      blankLine: "always",
      prev: "multiline-const",
      next: "*"
    },
    {
      blankLine: "never",
      prev: [ "singleline-const", "singleline-let" ],
      next: [ "singleline-const", "singleline-let" ]
    },
    {
      blankLine: "always",
      prev: "*",
      next: [
        "if",
        "for",
        "try",
        "switch",
        "do",
        "while"
      ]
    },
    {
      blankLine: "always",
      prev: "*",
      next: "expression"
    },
    {
      blankLine: "never",
      prev: "expression",
      next: "expression"
    },
    {
      blankLine: "always",
      prev: "*",
      next: "multiline-expression"
    },
    {
      blankLine: "always",
      prev: "*",
      next: "return"
    }
  ],
  "padded-blocks": [
    "error",
    {
      blocks: "never",
      switches: "never"
    }
  ],
  "keyword-spacing": [ "error" ],
  "space-before-blocks": [ "error" ],
  "space-in-parens": [ "error" ],
  "array-bracket-newline": [
    "error",
    {
      multiline: true,
      minItems: 3
    }
  ],
  "array-element-newline": [
    "error",
    {
      ArrayExpression: {
        multiline: true,
        minItems: 3
      },
      ArrayPattern: {
        multiline: true,
        minItems: 3
      }
    }
  ],
  "array-bracket-spacing": [ "error", "always" ],
  "object-shorthand": [ "error" ],
  "object-curly-spacing": [ "error", "always" ],
  "object-property-newline": [ "error", { allowAllPropertiesOnSameLine: false } ],
  "object-curly-newline": [
    "error",
    {
      ObjectExpression: {
        multiline: true,
        minProperties: 3
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 3
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 3
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 3
      }
    }
  ],
  // "newline-per-chained-call": [ "error", { ignoreChainWithDepth: 2 } ],
  "dot-location": [ "error", "property" ],
  "comma-style": [ "error", "last" ],
  "comma-spacing": [
    "error",
    {
      before: false,
      after: true
    }
  ],
  "space-before-function-paren": [
    "error",
    {
      anonymous: "always",
      named: "never",
      asyncArrow: "always"
    }
  ],
  "block-spacing": [ "error", "always" ],
  "no-multi-spaces": [ "error" ],
  "template-curly-spacing": [ "error", "never" ],
  "computed-property-spacing": [ "error", "always" ],
  "one-var-declaration-per-line": [ "error", "always" ],
  "function-call-argument-newline": [ "error", "consistent" ],
  // "function-paren-newline": [ "error", { minItems: 2 } ],
  "no-async-promise-executor": [ "warn" ],
  "arrow-parens": [ "error", "as-needed" ],
  "space-infix-ops": [ "error" ],
  "no-restricted-imports": [ 2, { patterns: [ "../*" ] } ],
  "no-restricted-modules": [ 2, { patterns: [ "../*" ] } ],
  "import/no-unresolved": [ "off" ],
  "import/namespace": [ "off" ],
  "import/no-named-as-default": [ "off" ],
  "import/newline-after-import": [ "error" ],
  "import/no-useless-path-segments": [
    "error",
    {
      noUselessIndex: true,
      commonjs: true
    }
  ],
  "import/extensions": [
    "error",
    "never",
    {
      jpg: "always",
      jpeg: "always",
      gif: "always",
      pdf: "always",
      svg: "always",
      png: "always",
      api: "always"
    }
  ],
  "import/no-relative-parent-imports": [ "error" ],
  "import/export": [ "error" ],
  "import/no-unused-modules": [ "error" ],
  "import/first": [ "error" ],
  "import/no-duplicates": [ "error" ],
  "import/order": [
    "error",
    {
      "newlines-between": "always",
      "groups": [
        "builtin",
        "external",
        [ "internal", "parent" ],
        "index",
        "sibling",
        "object",
        "unknown"
      ],
      "pathGroups": [
        {
          pattern: "src/**",
          group: "internal"
        },
        {
          pattern: "storybook/**",
          group: "internal"
        },
        {
          pattern: "assets/**",
          group: "internal",
          position: "after"
        }
      ],
      "pathGroupsExcludedImportTypes": [ "builtin" ]
    }
  ]
};
