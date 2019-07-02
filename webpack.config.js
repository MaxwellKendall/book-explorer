const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["babel-polyfill", "react-hot-loader/patch", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "",
    filename: "bundle.js"
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: { presets: ["react-hmre"] }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader?name=fonts/[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
      title: "Book Explorer | React/Redux"
    }),
    new ExtractTextPlugin("styles.css")
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  }
};
