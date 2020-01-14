const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const uglifyJsContents = require('uglify-js');
const jsonminify = require('jsonminify');

module.exports = {
    mode: 'production',
    entry: {
        background: ['@babel/polyfill', './background.js'],
        injected: ['@babel/polyfill', './injected.js'],
        popup: ['@babel/polyfill', './popup.js']
    },
  
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'       
    },
  
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
          { from: 'jquery-2.1.4.min.js', to: 'jquery-2.1.4.min.js', transform: function(fileContent, path) { return uglifyJsContents.minify(fileContent.toString()).code.toString(); }},
          { from: 'popup.css', to: 'popup.css' },
          { from: 'popup.html', to: 'popup.html'},
          { from: 'smg.png', to: 'smg.png' },
          { from: 'images', to: 'images' },
          { from: 'manifest.json', to: 'manifest.json', transform: function(fileContent, path) { return jsonminify(fileContent.toString()); }}
      ])
    ]  
  };