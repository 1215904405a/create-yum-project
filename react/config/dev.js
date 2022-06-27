const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// const chalk = require('chalk');
const config = require('./webpack.dev.conf');

const compiler = webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);
(async () => {
  await server.start();
  console.log('dev server is running');
})();
