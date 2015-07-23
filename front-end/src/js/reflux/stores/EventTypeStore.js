var Reflux = require("reflux");
var EventTypeActions = require("../actions/EventTypeActions");

var EventTypeStore = Reflux.createStore({
  data: {
    eventTypes: [],
    eventType: {}
  },

  init: function() {
    this.listenToMany(EventTypeActions);
  },

  onLoadEventTypesCompleted: function(eventTypes) {
    this.data.eventTypes = eventTypes;
    this.trigger(this.data);
  },

  onLoadEventTypeByIdCompleted: function(eventType) {
    this.data.eventType = eventType;
    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = EventTypeStore;
