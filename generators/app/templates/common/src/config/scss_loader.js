const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports = module.exports = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    'css-hot-loader',
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/'
      }
    },
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ]
}
