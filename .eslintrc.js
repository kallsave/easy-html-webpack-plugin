module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 6,
  },
  env: {
    "node": true,
    "commonjs": true,
  },
  extends: [
    'standard'
  ],
  rules: {
    'arrow-parens': 'off',
    "comma-dangle": ["off"],
    'eol-last': 'off',
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
  }
}
