const { DefinePlugin } = require('webpack');
const paths = require('../paths');
const { isLocal } = require('./constants');

module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: paths.alias,
  },
  devtool: isLocal ? 'eval-cheap-module-source-map' : 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.HOST': JSON.stringify(process.env.HOST),
    }),
  ],
};
