var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var PageTitle = require("./pageTitle.jsx");

var Dashboard = React.createClass({

  render: function() {
    return (
      <PageTitle fonticon="icon-map-streamline-user" title="Tableau de bord (PAGE EN TRAVAUX)" />
    );
  }
});

module.exports = Dashboard;
