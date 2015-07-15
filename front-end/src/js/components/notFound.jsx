var React = require("react");
var Router = require("react-router");
var Header = require("./header/header.jsx");

var NotFound = React.createClass({

  render: function() {
    return (
        <div>
          <Header flux={this.props.flux} />
          <h1>404</h1>
        </div>
    );
  }
});

module.exports = NotFound;
