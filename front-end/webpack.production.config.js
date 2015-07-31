var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'js', 'app.js');

var config = {
  // We change to normal source mapping
  devtool: 'source-map',
  plugins: [
     new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
     new Webpack.optimize.DedupePlugin(),
     new Webpack.optimize.OccurenceOrderPlugin(),
     new Webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot','jsx-loader' ],
        include: path.join(__dirname, 'src/js'),
        exclude: [nodeModulesPath]
      },
      { test: /\.(less)$/, loader: 'style!css!less' },
      { test: /\.(json)$/, loader: 'json-loader' },
      { test: /\.(gif|png|jpg)$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader' }
    ]
  }
};

module.exports = config;
