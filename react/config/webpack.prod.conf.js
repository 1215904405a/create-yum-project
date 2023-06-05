const { merge } = require('webpack-merge');
// const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'cheap-source-map', // 只能定位到行数，不能定位到列数
  module: {

  },

  optimization: {
    moduleIds: 'deterministic',
  },

  plugins: [
    // 多版本共存模式时 必须要取消这个插件
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['../dist'],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
  ],
});

module.exports = devWebpackConfig;
