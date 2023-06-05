const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const apiMocker = require('mocker-api');

const mockerFile = ['./mock/index.js'];

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map', // 可以生成单独的.map文件，还可以定位到babel转换前的源代码，能够大大提高调试代码的效率
  module: {

  },

  optimization: {
    moduleIds: 'named',
  },
  devServer: {
    port: '8888',
    host: '0.0.0.0',
    // hot: true,
    // client: false,
    // open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // server: 'http',
    compress: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    // onBeforeSetupMiddleware
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': require('../config/dev.env'),
    // }),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../src/static'),
    //     to: 'static',
    //   },
    // ]),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  ],
});

module.exports = devWebpackConfig;
