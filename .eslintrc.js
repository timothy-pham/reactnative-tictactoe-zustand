const { singleQuote } = require("./.prettierrc");

module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'curly': 'off',
    'no-unused-vars': 'off',
    singleQuote: singleQuote,
  },
};
