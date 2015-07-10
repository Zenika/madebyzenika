var ConstantsResourceType = require("../constants/resourceType");
var ResourceTypeService = require("../utils/ServiceRest/ResourceTypeService");

var ResourceTypeActions = {

  loadResourceTypes: function() {
    ResourceTypeService.getResourceTypes().then(function(res) {
      console.log("loading");
      this.dispatch(ConstantsResourceType.LOAD_RESOURCE_TYPES_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsResourceType.LOAD_RESOURCE_TYPES_FAIL, {error: err});
    }.bind(this));
  },

  loadResourceTypesForEnum: function() {
    return new Promise(function(resolve, reject) {
      ResourceTypeService.getResourceTypes().then(function(res) {
        resolve(res.body);
      }, function(err) {
        reject({error: err});
      });
    });
  },

  loadResourceTypeById: function(id) {
    ResourceTypeService.getResourceType(id).then(function(res) {
      this.dispatch(ConstantsResourceType.LOAD_RESOURCE_TYPE_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsResourceType.LOAD_RESOURCE_TYPE_FAIL, {error: err});
    }.bind(this));
  },

  postResourceType: function(ResourceType) {
    return new Promise(function(resolve, reject) {
      ResourceTypeService.postResourceType(ResourceType).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  putResourceType: function(idResourceType, ResourceType) {
    return new Promise(function(resolve, reject) {
      ResourceTypeService.putResourceType(idResourceType, ResourceType).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  deleteResourceType: function(idResourceType) {
    return new Promise(function(resolve, reject) {
      ResourceTypeService.deleteResourceType(idResourceType).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  clearResourceType: function() {
    this.dispatch(ConstantsResourceType.CLEAR_RESOURCE_TYPES);
  }
};

module.exports = ResourceTypeActions;
