import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'
//To resolve typescript issues when using devServer we need to import webpack-dev-server
import 'webpack-dev-server';

let mode: Configuration["mode"] = process.env.NODE_ENV === 'production' ? 'production' : 'development';
// fix for HMR when using postcss and browserlist
let target = mode === 'production' ? 'browserslist' : 'web'

const config: Configuration = {
  mode: mode,
  target: target,
  entry: path.resolve(__dirname, './src/index.tsx'),
  devtool: 'source-map',
  devServer: {
    static: './dist',
    port: 4000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './dist/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.(s[a|c]|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
}

export default config;