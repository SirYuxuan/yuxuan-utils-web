module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/no-unused-components': 'off',
    'semi': [2, 'never'],
    'quotes': [2, 'single'],
    'no-var': 2,
    'vue/multi-word-component-names':0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
  }
}
