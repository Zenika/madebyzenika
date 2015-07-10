var Fluxxor = require("fluxxor");
var ConstantsEvent = require("../constants/event");

var EventStore = Fluxxor.createStore({

  initialize: function() {
    this.projectEvent = {};

    this.eventsByProject = [];

    this.bindActions(
      ConstantsEvent.LOAD_EVENTS_BY_PROJECT_SUCCESS, this.onLoadEventsByProjectsSuccess,
      ConstantsEvent.LOAD_EVENTS_BY_PROJECT_FAIL, this.onLoadEventsByProjectsFail,
      ConstantsEvent.LOAD_EVENT_SUCCESS, this.onLoadEventSuccess,
      ConstantsEvent.LOAD_EVENT_FAIL, this.onLoadEventFail,
      ConstantsEvent.CLEAR_EVENTS_BY_PROJECT, this.clearEventsByProject
    );
  },

  onLoadEventSuccess: function(data) {
      this.projectEvent = data;
      this.emit("change");
  },

  onLoadEventFail: function(err) {
      console.log(err);
      this.emit("change");
  },

  onLoadEventsByProjectsSuccess: function(data) {
    this.eventsByProject = data;
    this.emit("change");
  },

  onLoadEventsByProjectsFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  clearEventsByProject: function() {
    this.eventsByProject = {};
  }

});

module.exports = EventStore;
