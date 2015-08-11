var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var SideMenu = require("./sideMenu/sideMenu.jsx");

var Admin = React.createClass({


  render: function() {
    return (
      <div id="wrapper">
          <SideMenu />
          <div id="page-wrapper">
            <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <RouteHandler {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Admin;
