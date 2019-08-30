const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = require('./env.config');
const cssLoaders = require('./css_loaders');

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/index.tsx')
  ],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/' + (env.isDev ? '[name].bundle.js' : '[name].[hash].bundle.js'),
    chunkFilename: 'static/js/' + (env.isDev ? '[name].chunk.js' : '[name].[contenthash].chunk.js'),
    publicPath: env.isDev ? '/' : '/'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 20,
          minChunks: 2
        }
      }
    },

    minimizer: [new UglifyJsPlugin()]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },

  devtool: 'source-map',

  devServer: {
    hot: true
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|js|tsx|jsx)?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
          },
          {
            test: /\.(ts|js|tsx|jsx)?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),
              cacheDirectory: true,
              cacheCompression: true,
              compact: true,
            }
          },
        ]
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      cssLoaders,
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../src/templates/index.html'),
      inject: true,
      chunks: ['main', 'common']
    }),

    new MiniCssExtractPlugin({
      filename: env.isDev ? 'static/css/[name].css' : 'static/css/[name].[contenthash].css',
      chunkFilename: env.isDev ? 'static/css/[id].css' : 'static/css/[id].[contenthash].css'
    }),
    new TerserWebpackPlugin(),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../assets/'),
        to: path.resolve(__dirname, '../dist/assets')
      }
    ]),

    new CleanWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin()
  ]
};
