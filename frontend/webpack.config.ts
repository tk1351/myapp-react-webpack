import path from 'path'
import webpack, { Configuration } from 'webpack'
import Dotenv = require('dotenv-webpack')
import dotenv from 'dotenv'

dotenv.config()

const env = require(path.join(__dirname, './.env'))

const config: Configuration = {
  context: path.join(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'static'),
    open: true,
    port: 3000,
    proxy: {
      '/api': 'http://backend:8080',
    },
  },
  plugins: [new Dotenv()],
}

export default config
