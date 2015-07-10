var Fluxxor = require("fluxxor");
var ConstantsResource = require("../constants/resource");

var ResourceStore = Fluxxor.createStore({

  initialize: function() {
    this.resource = {};

    this.resourcesByProject = [];

    this.resourcesByEvent = [];

    this.bindActions(
      ConstantsResource.LOAD_RESOURCE_SUCCESS, this.onLoadResourceSuccess,
      ConstantsResource.LOAD_RESOURCE_FAIL, this.onLoadResourceFail,

      ConstantsResource.LOAD_RESOURCES_BY_PROJECT_SUCCESS, this.onLoadResourcesByProjectSuccess,
      ConstantsResource.LOAD_RESOURCES_BY_PROJECT_FAIL, this.onLoadResourcesByProjectFail,

      ConstantsResource.LOAD_RESOURCES_BY_EVENT_SUCCESS, this.onLoadResourcesByEventSuccess,
      ConstantsResource.LOAD_RESOURCES_BY_EVENT_FAIL, this.onLoadResourcesByEventFail,

      ConstantsResource.CLEAR_RESOURCE, this.clearResource
    );

  },

  onLoadResourceSuccess: function(data) {
    this.resource = data;
    this.emit("change");
  },

  onLoadResourceFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadResourcesByProjectSuccess: function(data) {
    this.resourcesByProject = data;
    this.emit("change");
  },

  onLoadResourcesByProjectFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadResourcesByEventSuccess: function(data) {
    this.resourcesByEvent[data.eventId] = data.res;
    this.emit("change");
  },

  onLoadResourcesByEventFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  clearResource: function() {
    this.resource = {};
    this.emit("change");
  }

});

module.exports = ResourceStore;
