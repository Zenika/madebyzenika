module.exports = {
    watch: true,
    module: {
      loaders: [
        { test: /\.(js|jsx)$/, loader: 'jsx-loader' },
        { test: /\.(less)$/, loader: 'style!css!less' },
        { test: /\.(json)$/, loader: 'json-loader' },
        { test: /\.(gif|png|jpg)$/, loader: "url-loader?mimetype=image/png" },
        { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader' }
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
