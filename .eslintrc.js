module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true
  },
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
  }
};
