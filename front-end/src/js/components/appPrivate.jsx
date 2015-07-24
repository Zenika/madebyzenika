var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Header = require("./header/header.jsx");
var store = require("../utils/LocalStorage/LocalStorage");

var Reflux = require("reflux");

var AuthStore = require("../reflux/stores/AuthStore");
var AuthActions = require("../reflux/actions/AuthActions");

var AppPrivate = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(AuthStore)],

  componentDidMount: function() {
    var token = store.get("access_token");
    var currentUser = store.get("currentUser");
    var isLoggedIn = AuthStore.data.isLoggedIn;

    if(!(token && currentUser)) {
      this.transitionTo("home");
    }
  },

  render: function() {

    return (
        <div>
          <RouteHandler {...this.props} />
        </div>
    );
  }
});

module.exports = AppPrivate;
