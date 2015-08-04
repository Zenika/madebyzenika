var Reflux = require("reflux");
var _ = require("lodash");

var NotificationActions = require("../actions/NotificationActions");

var notificationStore = Reflux.createStore({
  data: {
    notification: {}
  },

  init: function() {
    this.listenToMany(NotificationActions);
  },

  onSetNotification: function(message, level) {
    this.data.notification.message = message;
    this.data.notification.level = level;
    this.trigger(this.data);
    this.onClearNotification();
  },

  onClearNotification: function() {
    this.data.notification.message = "";
    this.data.notification.level = "";
    this.data.notification.position = "tc";
    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = notificationStore;
