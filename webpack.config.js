const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const { LoaderOptionsPlugin } = require("webpack");


module.exports = {
  entry: ["./src/main.js", "./src/style.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCSSExtractPlugin(),
    new ESLintWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
