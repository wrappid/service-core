module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
    "node",
    "promise",
    "unused-imports",
    "@typescript-eslint",
    "jsdoc"
  ],
  rules: {
    indent: ["error", 2, { MemberExpression: 1, SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "off",
    "no-unused-vars": ["error", { args: "after-used", vars: "all" }],
    "import/order": [
      "error",
      { alphabetize: { caseInsensitive: true, order: "asc" } },
    ],
    "import/newline-after-import": "error",
    "@typescript-eslint/no-explicit-any": "warn",

    // JSDoc rules for TypeScript files
    "jsdoc/require-jsdoc": ["error", {
      "contexts": [
        "TSInterfaceDeclaration",
        "TSMethodSignature",
        "TSFunctionType",
        "TSConstructorType"
      ]
    }],
    "jsdoc/require-param": "error",
    "jsdoc/require-param-description": "error",
    "jsdoc/require-returns": "error",
    "jsdoc/require-description": "error"
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
