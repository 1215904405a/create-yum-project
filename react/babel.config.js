const presets = [
  [
    '@babel/preset-env',
    {
      // 'targets': '> 1%, last 2 versions',  // package.json 统一配置targets  供babel、autoprefixer、stylelint、core-js-compat等，统一使用
      bugfixes: true,
      useBuiltIns: 'usage', // usage：自动加载你使用 polyfills   entry：手动去单独引入要用的
      corejs: 3,
      shippedProposals: true // 用 usage    shippedProposals和'corejs' 二选一
    }
  ],
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const plugins = [
  [
    // 1、切记不要引用第三方库用了es6静态和实例方法的比如g2、g6，而且还不能es6模块引入webpack加以处理的，低版本兼容有问题；要不低版本只能引入全部的 babel-polyfill
    // 2、Promise、Map等不污染全局
    // 3、多文件，公用语法方法提取，减少代码量
    '@babel/plugin-transform-runtime', {
      'absoluteRuntime': false,
      'corejs': { version: 3, proposals: true },
      'helpers': true,
      'regenerator': true,
      'version': '^7.18.3' // @babel/runtime
    },
  ],
  ['import', {
    libraryName: 'antd',
    style: true, // or 'style' or true
  }],
];

module.exports = { presets, plugins };

