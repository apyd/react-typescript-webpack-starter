import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'
//to resolve typescript issues when using devServer we need to import webpack-dev-server
import 'webpack-dev-server';

let mode: Configuration["mode"] = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config: Configuration = {
  mode: mode,
  entry: path.resolve(__dirname, './src/index.tsx'),
  devtool: 'source-map',
  devServer: {
    static: './dist',
    port: 4000
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    extensions: ['*', '.ts', '.js', '.tsx', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
}

export default config;