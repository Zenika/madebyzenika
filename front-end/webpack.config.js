var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'js', 'app.js');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot','jsx-loader' ],
        include: path.join(__dirname, 'src/js')
      },
      { test: /\.(js|jsx)$/, loader: 'jsx-loader' },
      { test: /\.(less)$/, loader: 'style!css!less' },
      { test: /\.(json)$/, loader: 'json-loader' },
      { test: /\.(gif|png|jpg)$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader' }
    ]
  },
  node: {
    net: "empty",
    type: "empty",
    dot: "empty",
    dns: "empty"
  }
};
