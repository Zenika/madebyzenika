var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Reflux = require("reflux");

var AuthStore = require("../../reflux/stores/AuthStore");
var AuthActions = require("../../reflux/actions/AuthActions");

var Header = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(AuthStore)],

  componentDidMount: function() {
    window.addEventListener('google-loaded',this.gapiRender);
  },

  componentDidUpdate: function() {
    if(!this.state.isLoggedIn)
      this.gapiRender();
  },

  gapiRender: function() {
    gapi.signin2.render('g-signin2', {
			'scope': 'openid email',
      'onsuccess': this.signinCallback,
      'theme': 'light',
      'clientid': "1083777438685-kjrgndua0oiqhlhpl67qdjvjqn4okkoo",
      'cookiepolicy':"single_host_origin",
      'accesstype': "offline",
		});
  },

  getConnectButton: function() {
      return (
        <div id="g-signin2" data-onsuccess={this.signinCallback}>
          <span className="icon"></span>
          <span className="buttonText">Google</span>
        </div>
      );
  },

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
    var currentUser = this.state.userInfo;

    var disconnectButton = <span key={currentUser.id} >
                            <span className="userInfoHeader">
                                {currentUser.given_name} {currentUser.family_name}
                              <img src={currentUser.picture} />
                            </span>
                            <button className="btn btn-danger btn-sm" onClick={this.disconnect}>Déconnexion</button>
                           </span>;
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
              <div className="navbar-text">{ this.state.isLoggedIn ? disconnectButton : this.getConnectButton() }</div>
            </ul>
          </div>
        </div>
      </nav>
    );
  },

  signinCallback: function (authResult) {
    if (authResult["code"]) {
        AuthActions.loadAuthorizationCode(authResult["code"]);
    } else if (authResult['error']) {
      console.log("Une erreur s'est produite : " + authResult['error']);
    }
  },

  disconnect: function() {
    AuthActions.clearTokenAndUserInfo();
    this.transitionTo("home");
  },

  componentWillUnmount: function() {
    delete window[this.callbackName];
  }

});

module.exports = Header;
