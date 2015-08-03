var Reflux = require("reflux");

var notificationActions = Reflux.createActions(["setNotification","clearNotification"]);

module.exports = notificationActions;
