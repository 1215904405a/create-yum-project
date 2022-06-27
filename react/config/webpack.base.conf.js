const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ChunkRenamePlugin = require('webpack-chunk-rename-plugin');
// TODO: optimize-css-assets-webpack-plugin
// TODO: 输出信息简化
// TODO: webpack5联邦模块

const SCRIPT_CHUNK = '[name].[chunkhash].js';
// const STYLES_FORMAT = '[name].[contenthash].css';

let publicPath = '/';
let env = '';
process.argv.forEach((item) => {
  if (item.match(/--env=\w*/)) {
    env = item.split('=')[1];
  }
});
// if (process.env.NODE_ENV !== 'production') {

publicPath = env !== 'dev' ? './' : '/';

const config = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: SCRIPT_CHUNK,
    path: path.resolve(__dirname, '../dist'),
    publicPath,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    alias: { // ts请往compilerOptions
      '@': path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components'),
      utils: path.join(__dirname, '../src/utils'),
      modules: path.join(__dirname, '../src/modules'),
    },
  },

  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',

  optimization: {
    // runtimeChunk: {
    //   name: 'manifest',
    // },
    splitChunks: {
      cacheGroups: {
        nodeModules: {
          //参考1 test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, all
          //参考2 test: /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/
          test: /[\\/]node_modules[\\/]/,
          // async表示只从异步加载得模块里面进行拆分
          // initial表示只从入口模块进行拆分
          // all表示以上两者都包括
          chunks: 'initial',
          name: 'nodeModules',
        },
        // asyncNodeModules: {
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: 'async',
        //   name: 'asyncNodeModules',
        // },
        // components: {
        //   test: /[\\/]src[\\/]components[\\/]/,
        //   chunks: 'all',
        //   name: 'components',
        // },
        // 不能拆分过多 影响首页加载
        // assets: {
        //   test: /[\\/]src[\\/]assets[\\/]/,
        //   chunks: 'all',
        //   name: 'assets',
        // },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '开发管理分析系统',
      template: 'src/template/index.html',
      minify: true,
      chunks: ['app'],
      templateParameters: {
        env,
      },
      favicon: 'favicon.ico',
      filename: 'index.html',
    }),
    // new webpack.DefinePlugin({ 'process.env.DEBUG_ENV': JSON.stringify(env) }),
    new MiniCssExtractPlugin({
      filename: env !== 'dev' ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: env !== 'dev' ? '[id].[contenthash].css' : '[id].css',
      ignoreOrder: true,
    }),
    new webpack.ProvidePlugin({ axios: 'axios' }),
    // new webpack.ProvidePlugin({ tzenv: 'env' }),
    new webpack.DefinePlugin({ // 坑点ts环境下需要声明才起作用
      _FRENV_: JSON.stringify(env),
    }),
    new AntdDayjsWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../src/static'),
    //     to: 'static',
    //     // ignore: ['lib/*.*'],
    //   },
    // ]),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, '../src/sw.js'), to: publicPath },
    //     // { from: "other", to: "public" },
    //   ],
    // }),
    // optimization会导致output.filename失效 所以使用此插件
    // https://github.com/webpack/webpack/issues/6598
    // new ChunkRenamePlugin({
    //   app: '[name].bundle.js',
    //   vendors: '[name].bundle.js',
    //   manifest: '[name].bundle.js',
    // }),
  ],

  module: {
    rules: [{
      test: /\.less$/,
      // exclude: /node_modules/,
      use: [
        // style-loader库实现了HMR接口，当通过HMR收到更新时，它将用新样式替换旧样式。区分开发环境和生产环境，用不同loader
        env !== 'dev' ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'global',
            },
            // sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                  {
                    browsers: 'last 2 versions',
                    autoprefixer: { grid: true },
                  },
                ],
              ],
            },
          },
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: { // 定义样式变量
                'primary-color': '#7373FF',
                'border-radius-base': '4px',
                'text-color': '#203166',
                'label-color': '#203166',
                'table-header-color': '#203166',
                'border-color-base': '#EBEDF7',
                // 'input-border-color': '#EBEDF7',
                // 'select-border-color': '#EBEDF7',
                'input-placeholder-color': '#CCD0DE',
                // or
                // 'hack': `true; @import "your-less-file-path.less";`, // Override with less file
              },
              javascriptEnabled: true,
            },
          },
        },
      ],
    }, { // antd的css不需要modules Scope
      test: /\.css$/,
      include: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'global',
            },
            // sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader', // 基于 file-loader
      options: {
        limit: 10000,
        publicPath,
        // name: '[name].[hash:7].[ext]',
        name() {
          if (env === 'dev') {
            return '[name].[ext]';
          }
          return '[name].[contenthash:7].[ext]';
        },
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name() {
            if (env === 'dev') {
              return '[name].[ext]';
            }
            return '[contenthash].[ext]';
          },
          publicPath,
        },
      }],
    },
    {
      test: /\.ts|tsx$/,
      // exclude: /(node_modules|bower_components)/,
      include: [
        path.resolve(__dirname, "../node_modules/reactcomponent/com"),
        path.resolve(__dirname, "../src")
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    }, {
      test: /\.(js|jsx)$/,
      // include: /(src|(node_modules\/@loadable))/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }],
    }],
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    warnings: false,
    warningsFilter: [
      'filter',
      /filter/,
      (warning) => true,
    ],
  },
};

if (env === 'analyzer') {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config