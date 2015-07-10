var Fluxxor = require("fluxxor");
var ConstantsEventType = require("../constants/eventType");

var EventTypeStore = Fluxxor.createStore({

  initialize: function() {
    this.eventTypes = {};

    this.eventType = {};

    this.bindActions(
      ConstantsEventType.LOAD_EVENT_TYPES_SUCCESS, this.onLoadAllEventTypesSuccess,
      ConstantsEventType.LOAD_EVENT_TYPES_FAIL, this.onLoadAllEventTypesFail,

      ConstantsEventType.LOAD_EVENT_TYPE_SUCCESS, this.onLoadEventTypeSuccess,
      ConstantsEventType.LOAD_EVENT_TYPE_FAIL, this.onLoadEventTypeFail,

      ConstantsEventType.CLEAR_EVENT_TYPES, this.clearEventTypes
    );
  },

  onLoadAllEventTypesSuccess: function(data) {
    this.eventTypes = data;
    this.emit("change");
  },

  onLoadAllEventTypesFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadEventTypeSuccess: function(data) {
    this.eventType = data;
    this.emit("change");
  },

  onLoadEventTypeFail: function(error) {
      console.log(error);
      this.emit("change");
  },

  clearEventTypes: function(){
    this.eventTypes = {};
  }
});

module.exports = EventTypeStore;
