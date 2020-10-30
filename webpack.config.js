const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  //configure the server for development --> bundle is served at /build path and a proxy local server is used at port 3000
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/**': {
        target: 'http://localhost:3000',
      }
    }
  },
  //global NODE_ENV set in scripts in package.json
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      // list of rules include objects with test and use properties
      //babel processes jsx files
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //preset-env is overall environment, passing react narrows down scope of environment for transpilations
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      //style loaders
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings (third)
          'style-loader',
          // Translates CSS into CommonJS (second)
          'css-loader',
          // Compiles Sass to CSS (first)
          'sass-loader',
        ],
      },
      //extracts css for faster loading
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ]
}