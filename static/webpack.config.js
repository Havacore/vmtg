const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');


//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {};
module.exports = config;


config.resolve = {
  extensions: ['.ts', '.js']
};

config.module = {
  loaders: [
    {test: /\.ts$/, loader: 'awesome-typescript-loader'},
    {test: /\.html$/, loader: 'raw-loader'},
    {test: /\.scss$/, loader: 'raw-loader!postcss!sass', exclude: path.resolve('src/views/common/styles'), include: path.resolve('src/views')}
  ]
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    __dirname
  ),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({ browsers: ['last 3 versions'] })
      ],
      sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
      }
    }
  })
];

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {from: './src/assets', to: 'assets'}
    ]),
    new HtmlWebpackPlugin({
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.entry.main = ['./src/main.ts'];
  config.devtool = 'cheap-module-source-map';

  config.entry.main.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);

  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader', include: path.resolve('src/views/common/styles')}
  );

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    outputPath: config.output.path,
    port: PORT,
    publicPath: config.output.publicPath,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.entry.main = ['./src/main.aot.ts'];
  config.devtool = 'source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module.loaders.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader?-autoprefixer!postcss-loader!sass-loader'),
      include: path.resolve('src/views/common/styles')}
  );

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      }
    })
  );
}


//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.loaders.push(
    {test: /\.scss$/, loader: 'style!css!postcss!sass', include: path.resolve('src/views/common/styles')}
  );
}
