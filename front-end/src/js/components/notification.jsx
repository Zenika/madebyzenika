var React = require("react");

var Reflux = require("reflux");

var NotificationStore = require("../reflux/stores/NotificationStore");
var NotificationActions = require("../reflux/actions/NotificationActions");

var NotificationSystem = require('react-notification-system');

var Notification = React.createClass({

  mixins: [Reflux.connect(NotificationStore)],

  _notificationSystem: null,

  _addNotification: function(message, level) {
    this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  },

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
  },

  componentWillReceiveProps: function (nextProps) {
    if(nextProps.notif.level && nextProps.notif.message) {
      this._addNotification(nextProps.notif.message, nextProps.notif.level);
    }
  },

  getInitialState: function(){
    return {};
  },

  render: function() {
    return ( <NotificationSystem ref="notificationSystem" /> );
  }
});

module.exports = Notification;
