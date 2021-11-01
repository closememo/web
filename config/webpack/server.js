const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const common = require('./common');
const paths = require('../paths');

const merged = merge([
    common,
    {
      entry: [`${paths.src}/server/index.ts`],
      output: {
        filename: 'server.js',
        sourceMapFilename: 'server.js.map',
        libraryTarget: 'commonjs2',
        path: paths.buildPath,
        publicPath: paths.publicPath,
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    exportOnlyLocals: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.(png|jpg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  emitFile: false,
                },
              },
            ],
          },
          {
            test: /\.(graphql)$/,
            exclude: [
              /node_modules/,
            ],
            use: [
              {
                loader: 'graphql-tag/loader',
              },
            ],
          },
        ],
      },
      target: 'node',
      externals: [
        nodeExternals(),
      ],
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ],
      optimization: {
        minimize: false,
      },
    },
  ],
);

module.exports = merged;
