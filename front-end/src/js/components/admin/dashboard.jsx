var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var PageTitle = require("./pageTitle.jsx");

var Dashboard = React.createClass({

  render: function() {
    return (
      <PageTitle fonticon="icon-map-streamline-user" title="mon espace (PAGE EN TRAVAUX)" />
    );
  }
});

module.exports = Dashboard;
