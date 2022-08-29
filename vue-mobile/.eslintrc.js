// off、warn 或 error 中的一个，表示关闭、警告和报错
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      'jsx': true,
      'tsx': true,
      'experimentalObjectRestSpread': true,
      'legacyDecorators': true
    },
  },
  globals: {
    axios: 'readonly', //全局变量不能被重写
    process: 'readonly',
  },
  'env': {
    'es6': true, //for new ES6 global variables（该选项会自动设置 ecmaVersion 解析器选项为 6）
    'browser': true,
    'commonjs': true
  },
  'plugins': [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // "plugin:prettier/recommended", // 具体建议下面rules直接配置
  ],
  rules: {
    quotes: [1, 'single'],
    '@typescript-eslint/indent': [
      'error',
      2,
      { VariableDeclarator: 4, SwitchCase: 1 },
    ],
    'vue/require-default-prop': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-useless-template-attributes': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
