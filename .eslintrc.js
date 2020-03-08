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
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "@typescript-eslint/member-ordering": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/quotes": ["error", "single"],
    "arrow-body-style": ["error", "as-needed"],
    "eol-last": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "no-dupe-keys": "error",
    "no-duplicate-imports": "error",
    "no-irregular-whitespace": "error",
    "no-multiple-empty-lines": "error",
    "no-template-curly-in-string": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "never"],
    "object-shorthand": ["error", "always"],
    "rest-spread-spacing": ["error", "never"],
    "simple-import-sort/sort": "error",
    eqeqeq: "error",
    quotes: "off",
    quotes: "off",
    semi: ["error", "never"]
  }
};
