var Reflux = require("reflux");
var ResourceActions = require("../actions/ResourceActions");

var ResourceStore = Reflux.createStore({
  data: {
    resource: {},
    resourcesByProject: [],
    resourcesByEvent: {}
  },

  init: function() {
    this.listenToMany(ResourceActions);
  },

  onLoadResourceByIdCompleted: function(resource) {
    this.data.resource = resource;
    this.trigger(this.data);
  },
  onLoadResourcesByProjectCompleted: function(resourcesByProject) {
    this.data.resourcesByProject = resourcesByProject;
    this.trigger(this.data);
  },

  onLoadResourcesByEventCompleted: function(resourcesByEvent) {
    this.data.resourcesByEvent[resourcesByEvent.eventId] = resourcesByEvent.resources;
    this.trigger(this.data);
  },

  onClearResource: function() {
    this.data.resource = {};
  },

  onClearResourcesByProject: function() {
    this.data.resourcesByProject = {};
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = ResourceStore;
