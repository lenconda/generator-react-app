const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports = module.exports = {
  test: /\.css$/,
  use: [
    'css-hot-loader',
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/'
      }
    },
    'css-loader',
    'postcss-loader'
  ]
}