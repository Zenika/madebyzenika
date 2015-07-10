var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var SignIn = require("./signIn.jsx");

var Header = React.createClass({
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
            <ul className="nav navbar-nav">
                <li><Link to="projects" >Les projets</Link></li>
                <li><Link to="dashboard" >Dashboard</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <SignIn flux={this.props.flux}/>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
