var ConstantsResource = require("../constants/resource");
var ResourceService = require("../utils/ServiceRest/ResourceService");

var ResourceActions = {

  loadResourceById: function(id) {
    ResourceService.getResource(id).then(function(res) {
      this.dispatch(ConstantsResource.LOAD_RESOURCE_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsResource.LOAD_RESOURCE_FAIL, {error: err});
    }.bind(this));
  },

  loadResourcesByProject: function(projectId) {
    ResourceService.getResourcesByProject(projectId).then(function(res) {
      this.dispatch(ConstantsResource.LOAD_RESOURCES_BY_PROJECT_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsResource.LOAD_RESOURCES_BY_PROJECT_FAIL, {error: err});
    }.bind(this));
  },

  loadResourcesByEvent: function(eventId) {
    ResourceService.getResourcesByEvent(eventId).then(function(res) {
      if(res.body){
        this.dispatch(ConstantsResource.LOAD_RESOURCES_BY_EVENT_SUCCESS, {eventId: eventId, res: res.body});
      }
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsResource.LOAD_RESOURCES_BY_EVENT_FAIL, {error: err});
    }.bind(this));
  },

  postResource: function(resource) {
    return new Promise(function(resolve, reject) {
      ResourceService.postResource(resource).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  putResource: function(idResource, resource) {
    return new Promise(function(resolve, reject) {
      ResourceService.putResource(idResource, resource).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  deleteResource: function(idResource) {
    return new Promise(function(resolve, reject) {
      ResourceService.deleteResource(idResource).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  clearResource: function() {
    this.dispatch(ConstantsResource.CLEAR_RESOURCE);
  }

};

module.exports = ResourceActions;
