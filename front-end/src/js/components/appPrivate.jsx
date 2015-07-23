var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Header = require("./header/header.jsx");
var store = require("../utils/LocalStorage/LocalStorage");

var Reflux = require("reflux");

var AuthStore = require("../reflux/stores/AuthStore");
var AuthActions = require("../reflux/actions/AuthActions");

var AppPrivate = React.createClass({

  mixins: [Reflux.connect(AuthStore)],

  componentDidMount: function() {
    // var token = store.get("access_token");
    // var currentUser = store.get("currentUser");
    // if( token && currentUser ) {
    //      AuthActions.setUserInStore(currentUser, token);
    // }
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
