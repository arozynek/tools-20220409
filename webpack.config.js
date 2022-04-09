const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { LoaderOptionsPlugin } = require("webpack");

module.exports = {
  entry: ["./src/main.js", "./src/style.css"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
