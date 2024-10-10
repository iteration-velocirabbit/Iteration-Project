const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'client'),
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], ['@babel/preset-react']],
          },
        },
      },

      {
        test: /\.css$/i, // Rule for CSS files
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'], // Loaders to process CSS
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: /node-modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve both .js and .jsx extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'build/index.html'),
    }),
  ],
};