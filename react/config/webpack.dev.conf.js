const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const apiMocker = require('mocker-api');

const mockerFile = ['./mock/index.js'];

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {

  },

  optimization: {
    moduleIds: 'named',
  },
  devServer: {
    port: '8888',
    host: '0.0.0.0',
    hot: false,
    client: false,
    // open: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // server: 'http',
    compress: false,
    // allowedHosts: [
    //   'host.com',
    //   'subdomain.host.com',
    //   'subdomain2.host.com',
    //   'host2.com',
    // ],
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
  ],
});

module.exports = devWebpackConfig;
