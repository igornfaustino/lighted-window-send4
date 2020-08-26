const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.tsx', // app start point
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index-prod.html',
      filename: 'index.html',
      inject: false,
      base: '/',
    }),
  ],
};

module.exports = config;
