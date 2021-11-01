const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const paths = require('../paths');
const common = require('./common');
const { isLocal } = require('./constants');

const cssLoader = isLocal ? 'style-loader' : MiniCssExtractPlugin.loader;

const config = isLocal
  ? {
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
  }
  : {
    output: {
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash].css',
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  };

const merged = merge([
  common,
  {
    entry: [`${paths.src}/client/index.tsx`],
    output: {
      path: paths.buildStaticPath,
      publicPath: paths.publicStaticPath,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            cssLoader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/img',
              },
            },
          ],
        },
      ],
    },
    target: 'web',
    plugins: [
      new LoadablePlugin({
        filename: paths.stats,
      }),
    ],
    optimization: {
      emitOnErrors: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules\/(.*)\.js/,
            name: 'vendor',
            chunks: 'all',
            priority: 1,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 2,
          },
        },
      },
    },
  },
  config,
]);

module.exports = merged;