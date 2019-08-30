const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports = module.exports = {
  test: /\.(css|styl)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/'
      }
    },
    'css-loader',
    'postcss-loader',
    'stylus-loader'
  ]
}
