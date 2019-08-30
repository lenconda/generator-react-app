const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports = module.exports = {
  test: /\.(le|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/'
      }
    },
    'css-loader',
    'postcss-loader',
    'less-loader'
  ]
}
