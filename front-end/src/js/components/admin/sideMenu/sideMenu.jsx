var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var SideMenu = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0, marginTop: -18 }} >
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#admin-navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">Mon espace</a>
        </div>
      <div className="navbar-default sidebar" role="navigation">
          <div id="admin-navbar" className="sidebar-nav navbar-collapse collapse">
              <ul className="nav" id="side-menu">
                <li><Link to="dashboard">Tableau de bord<span className="pull-right hidden-xs showopacity"></span></Link></li>
                  <li className="sidebar-list"><Link to="AdminProjects">Mes projets</Link></li>
                  <li className="sidebar-list"><Link to="AdminEventTypes">Types d'événements</Link></li>
                  <li className="sidebar-list"><Link to="AdminResourceTypes">Type de ressources</Link></li>
                  <li className="sidebar-list"><Link to="AdminTechnologies">Stack techniques</Link></li>
              </ul>
          </div>
      </div>
    </nav>
    );
  }
});

module.exports = SideMenu;
