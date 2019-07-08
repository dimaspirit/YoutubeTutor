const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    content: './src/content.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      safe: true
    }),
  ],
};

module.exports = config;
