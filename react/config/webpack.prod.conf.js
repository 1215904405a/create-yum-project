const { merge } = require('webpack-merge');
// const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map', // 'cheap-source-map',
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
