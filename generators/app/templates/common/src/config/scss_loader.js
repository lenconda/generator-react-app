const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports = module.exports = {
  test: /\.(sa|sc|c)ss$/,
  use: [
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
