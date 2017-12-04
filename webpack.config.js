const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js',
    ],
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval',
  module: {
    rules: [
      { test: /\.(js|jsx)?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react-hmre'] } },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader?name=images/[name].[ext]' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader?name=fonts/[name].[ext]' },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './',
  },
};
