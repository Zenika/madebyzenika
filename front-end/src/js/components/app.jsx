var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Header = require("./header/header.jsx");
var store = require("../utils/LocalStorage/LocalStorage");

var Reflux = require("reflux");

var NotificationStore = require("../reflux/stores/NotificationStore");
var NotificationActions = require("../reflux/actions/NotificationActions");

var AuthStore = require("../reflux/stores/AuthStore");
var AuthActions = require("../reflux/actions/AuthActions");

var Notification = require("./notification.jsx");

var App = React.createClass({

  mixins: [Reflux.connect(AuthStore), Reflux.connect(NotificationStore)],

  componentDidMount: function() {
    var token = store.get("access_token");
    var currentUser = store.get("currentUser");

    if( token && currentUser ) {
      AuthActions.setUserInStore(currentUser, token);
    }
  },

  render: function() {
    return (
        <div>
          <Header />
          <RouteHandler {...this.props} />
          <Notification notif={this.state.notification}/>
        </div>
    );
  }
});

module.exports = App;
