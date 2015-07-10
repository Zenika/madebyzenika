var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var SideMenu = require("./sideMenu/sideMenu.jsx");

var Admin = React.createClass({

  getInitialState: function(){
    return {};
  },


  render: function() {
    return (
      <div>
        <SideMenu flux={this.props.flux} />
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = Admin;
