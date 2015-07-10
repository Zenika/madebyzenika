module.exports = {
    watch: true,
    module: {
      loaders: [
        { test: /\.(js|jsx)$/, loader: 'jsx-loader' },
        { test: /\.(less)$/, loader: 'style!css!less' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.(gif|png|jpg)$/, loader: "url-loader?mimetype=image/png" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      ],
    },
    entry:[
        "./src/js/app.js"
    ],
    output: {
      filename: "app.js"
    },
    node: {
      net: "empty",
      type: "empty",
      dot: "empty",
      dns: "empty"
    }
};
