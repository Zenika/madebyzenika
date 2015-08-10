var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var SignIn = require("./signIn.jsx");

var Reflux = require("reflux");

var AuthStore = require("../../reflux/stores/AuthStore");
var AuthActions = require("../../reflux/actions/AuthActions");

var Header = React.createClass({

  mixins: [Reflux.connect(AuthStore)],

  getMenuItems: function(isLoggedIn) {
    if(isLoggedIn) {
      return (
        <ul className="nav navbar-nav">
          <li><Link to="projects" >Les projets</Link></li>
          <li><Link to="dashboard" >Mon espace</Link></li>
        </ul>
      )
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <nav className="navbar navbar-default" id="mainMenu">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" ><span className="navbar-brand" id="logo">mbz</span></Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
              {this.getMenuItems(this.state.isLoggedIn)}
            <ul className="nav navbar-nav navbar-right">
              <SignIn />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
