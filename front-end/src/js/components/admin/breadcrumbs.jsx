var React = require("react");

var Router = require("react-router");

var Reflux = require("reflux");

var ProjectStore = require("../../reflux/stores/ProjectStore");
var ProjectActions = require("../../reflux/actions/ProjectActions");

var DASHBOARD_ROUTE_NAME = "dashboard";

var BreadCrumbs = React.createClass({

  mixins: [Router.Navigation, Router.State, Reflux.connect(ProjectStore)],

  goBackNavigation: function(e) {
    e.preventDefault();
    this.goBack();
  },

  render: function() {
    var currentRoutes = this.context.router.getCurrentRoutes();
    var lastRoute = currentRoutes[currentRoutes.length - 1];

    return (
      <div className="row">
        <div className="col-md-12 previous">
          {(lastRoute.name != DASHBOARD_ROUTE_NAME) ? this.renderButtonBack() : null }
        </div>
      </div>
    );
  },

  renderButtonBack: function() {
    return  <a className="btn btn-primary btn-xs" onClick={this.goBackNavigation}><i className="fa fa-arrow-left"></i> précédent</a>;
  }

});

module.exports = BreadCrumbs;
