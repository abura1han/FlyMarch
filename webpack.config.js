const path = require("path");
const { fmActiveTheme } = require("./fmContents");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// Get active theme directory
let themeDir;
fmActiveTheme().then((theme) => (themeDir = theme.dirName));

module.exports = {
  entry: path.resolve(
    __dirname,
    "contents",
    "themes",
    "New Theme",
    "index.jsx"
  ),
  output: {
    path: path.resolve(__dirname, "static", "activeTheme"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./contents/themes/New Theme/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin(),
  ],
};
