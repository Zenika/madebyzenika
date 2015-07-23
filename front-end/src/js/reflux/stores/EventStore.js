var Reflux = require("reflux");
var EventActions = require("../actions/EventActions");

var EventStore = Reflux.createStore({
  data: {
    event: {},
    eventsByProject: []
  },

  init: function() {
    this.listenToMany(EventActions);
  },

  onLoadEventCompleted: function(event) {
      this.data.event = event;
      this.trigger(this.data);
  },

  onLoadEventsByProjectCompleted: function(eventsByProject) {
    this.data.eventsByProject = eventsByProject;
    this.trigger(this.data);
  },

  clearEvent: function() {
    this.data.event = {}
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = EventStore;
