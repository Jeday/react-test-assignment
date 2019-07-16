const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      Img: path.resolve(__dirname, './assets/img')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    },
    {
      test: /\.css$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: "babel-loader"
        },
        {
          loader: "react-svg-loader",
          options: {
            jsx: true
          }
        }]
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ]
};