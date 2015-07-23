var Reflux = require("reflux");
var ResourceTypeActions = require("../actions/ResourceTypeActions");

var ResourceStore = Reflux.createStore({
  data: {
    resourceType: {},
    resourceTypes: []
  },

  init: function() {
    this.listenToMany(ResourceTypeActions);
  },

  onLoadResourceTypesCompleted: function(resourcesTypes) {
    this.data.resourceTypes = resourcesTypes;
    this.trigger(this.data);
  },
  onLoadResourceTypeByIdCompleted: function(resourceType) {
    this.data.resourceType = resourceType;
    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = ResourceStore;
