var Fluxxor = require("fluxxor");
var ConstantsResourceType = require("../constants/resourceType");

var ResourceTypeStore = Fluxxor.createStore({

  initialize: function() {
    this.resourceTypes = {};

    this.resourceType = {};

    this.bindActions(
      ConstantsResourceType.LOAD_RESOURCE_TYPES_SUCCESS, this.onLoadResourceTypesSuccess,
      ConstantsResourceType.LOAD_RESOURCE_TYPES_FAIL, this.onLoadResourceTypesFail,

      ConstantsResourceType.LOAD_RESOURCE_TYPE_SUCCESS, this.onLoadResourceTypeSuccess,
      ConstantsResourceType.LOAD_RESOURCE_TYPE_FAIL, this.onLoadResourceTypeFail,

      ConstantsResourceType.CLEAR_RESOURCE_TYPES, this.clearResourceTypes
    );
  },

  onLoadResourceTypesSuccess: function(data) {
    this.resourceTypes = data;
    this.emit("change");
  },

  onLoadResourceTypesFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadResourceTypeSuccess: function(data) {
    this.resourceType = data;
    this.emit("change");
  },

  onLoadResourceTypeFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  clearResourceTypes: function(){
    this.resourceTypes = {};
  }
});

module.exports = ResourceTypeStore;
