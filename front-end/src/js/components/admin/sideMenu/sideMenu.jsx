var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var SideMenu = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default sidebar" role="navigation">
          <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="dashboard">Tableau de bord<span className="pull-right hidden-xs showopacity"></span></Link></li>
              <li><Link to="AdminProjects">Mes projets<span className="pull-right hidden-xs showopacity"></span></Link></li>
              <li><Link to="AdminEventTypes">Types d'événements<span className="pull-right hidden-xs showopacity"></span></Link></li>
              <li><Link to="AdminResourceTypes">Type de ressources<span className="pull-right hidden-xs showopacity"></span></Link></li>
              <li><Link to="AdminTechnologies">Stack techniques<span className="pull-right hidden-xs showopacity"></span></Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = SideMenu;
