var React = require("react");
var Router = require("react-router");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SignIn = React.createClass({

  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("AuthStore")],

  componentWillMount: function() {
    // Somehow generate a unique ID for every G+ button.
    this.callbackName = _.uniqueId("gPlusCallback-");
    // Google va chercher le callback dans le namespace global
    window["signinCallback"] = this.signinCallback;
  },

  getStateFromFlux: function() {
    var authStore = this.getFlux().store("AuthStore");
    return {
      isLoggedIn: authStore.isLoggedIn(),
      currentUser: authStore.userInfo
    };
  },

  render: function() {
    var currentUser = this.state.currentUser;
    console.log(currentUser);
    var connectButton = <span className="g-signin"
                              data-clientid="1083777438685-kjrgndua0oiqhlhpl67qdjvjqn4okkoo.apps.googleusercontent.com"
                              data-scope="https://www.googleapis.com/auth/plus.login  https://www.googleapis.com/auth/userinfo.email"
                              data-cookiepolicy="single_host_origin"
                              data-callback="signinCallback"
                              data-approvalprompt="force">
                            </span>;

    var disconnectButton = <span key={currentUser.id} >
                            <span className="userInfoHeader">
                                {currentUser.given_name} {currentUser.family_name}
                              <img src={currentUser.picture} />
                            </span>
                            <button className="btn btn-danger btn-sm" onClick={this.disconnect}>Déconnexion</button>
                           </span>;

    return <div className="navbar-text">{ this.state.isLoggedIn ? disconnectButton : connectButton }</div>;
  },

  signinCallback: function (authResult) {
    if (authResult['access_token']) {
      // // Autorisation réussie
      // // Masquer le bouton de connexion maintenant que l'utilisateur est autorisé, par exemple :
        this.getFlux().actions.AuthActions.getAuthorizationCode(authResult["code"]).then(function(data) {
          console.log(data);
            this.getFlux().actions.AuthActions.setLoginUser(data.access_token, data.userInfo);
            this.setState({ isLoggedIn : true });
        }.bind(this), function(err) {
            console.log(err);
        });

    } else if (authResult['error']) {
      // Codes d'erreur possibles :
      //   "access_denied" - L'utilisateur a refusé l'accès à votre application
      //   "immediate_failed" - La connexion automatique de l'utilisateur a échoué
      console.log("Une erreur s'est produite : " + authResult['error']);
    }
  },

  disconnect: function() {
    this.setState({ isLoggedIn : false });
    this.getFlux().actions.AuthActions.clearTokenAndUserInfo();
    this.transitionTo("home");
  },

  componentWillUnmount: function() {
    delete window[this.callbackName];
  }

});

module.exports = SignIn;
