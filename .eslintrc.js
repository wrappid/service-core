module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
  },
  extends: ["eslint:recommended", "plugin:require-extensions/recommended"],
  ignorePatterns: ["**/node_modules/*"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["etc", "require-extensions", "sort-keys-fix", "unused-imports"],
  rules: {
    indent: ["error", 2, { MemberExpression: 1, SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "off",
    "no-unused-vars": ["error", { args: "after-used", vars: "all" }],
  },
};
