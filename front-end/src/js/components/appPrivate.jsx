var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Header = require("./header/header.jsx");
var store = require("../utils/LocalStorage/LocalStorage");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AppPrivate = React.createClass({

  mixins: [FluxMixin],

  componentDidMount: function() {
    var token = store.get("access_token");
    var currentUser = store.get("currentUser");

    if( token && currentUser ) {
        this.getFlux().actions.AuthActions.getLoginUser(token, currentUser);
    }
  },

  getInitialState: function(){
    return {};
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
