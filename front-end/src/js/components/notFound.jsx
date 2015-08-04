var React = require("react");
var Router = require("react-router");
var Header = require("./header/header.jsx");

var NotFound = React.createClass({

  render: function() {
    return (
        <div>
          <h1>404 Not Found</h1>
        </div>
    );
  }
});

module.exports = NotFound;
