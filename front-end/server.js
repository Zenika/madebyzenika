var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var compress = require('compression');
var http = require('http');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var serviceRestIP = process.env.SERVICE_REST_IP;
var serviceRestPort = process.env.SERVICE_REST_PORT;
var port = isProduction ? 80 : 3000;
var publicPath = path.resolve(__dirname, 'public');

var ipServerWebPackDev = "http://127.0.0.1:3001";

// Gzip
app.use(compress());

app.use(express.static(publicPath));

app.all('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://' + serviceRestIP + ":" + serviceRestPort
  });
});

app.all('/cdnjs/*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://cdnjs.cloudflare.com/'
  });
});

if (!isProduction) {

  var bundle = require('./server/bundle.js');
  bundle();

  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: ipServerWebPackDev
    });
  });

  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: ipServerWebPackDev
    });
  });

  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  });

} else {

  // And run the server
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

}
