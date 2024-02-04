module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `prettier`,
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: `es2024`,
    sourceType: `module`,
  },
  plugins: [`react`, `@typescript-eslint`, `prettier`],
  rules: {
    'prettier/prettier': `error`,
    quotes: [`error`, `backtick`],
  },
};
