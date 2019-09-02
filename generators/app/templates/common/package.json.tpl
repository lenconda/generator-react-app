{
  "name": "<%= name %>",
  "version": "0.0.1",
  "description": "<%= description %>",
  "main": "index.js",
  "scripts": {
    "test": "exit 0",
    "start": "cross-env NODE_ENV=development webpack-dev-server --config config/webpack.config.js --mode development",
    "build": "cross-env NODE_ENV=production webpack --config config/webpack.config.js --mode production"
  },
  "repository": {
    "type": "git",
    "url": "<%= repository %>"
  },
  "author": "<%= author %>",
  "license": "<%= license %>",
  "bugs": {
    "url": ""
  },
  "devDependencies": {
    "@babel/core": "7.2.2",
    "@babel/plugin-proposal-class-properties": "7.3.0",
    "@babel/plugin-proposal-object-rest-spread": "7.3.1",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "7.3.1",
    "@babel/preset-react": "7.0.0",
    "@babel/preset-typescript": "7.1.0",
    "babel-eslint": "^10.0.2",
    "babel-loader": "8.0.5",
    "babel-preset-react-app": "^9.0.0",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^5.0.3",
    "cross-env": "^5.2.0",
    "css-loader": "2.1.0",
    "eslint": "^6.1.0",
    "eslint-config-alloy": "^2.0.5",
    "eslint-plugin-react": "^7.14.3",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "postcss-loader": "^3.0.0",
    "style-loader": "0.23.1",
    "terser-webpack-plugin": "^1.4.1",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "webpack": "4.28.0",
    "webpack-bundle-analyzer": "^3.4.1",
    "webpack-cli": "3.2.1",
    "webpack-dev-server": "3.1.14"
  },
  "dependencies": {
    "autoprefixer": "^9.6.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router": "^5.0.1",
    "react-router-dom": "^5.0.1"
  }
}
