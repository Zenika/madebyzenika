var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var ResourceTypeService = {

  getResourceTypes: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resourceTypes/")
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  getResourceType: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resourceTypes/" + id)
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  getResourceTypesByName: function(name) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resourceTypes")
        .query({ name: name })
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  postResourceType: function (resourceType) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/resourceTypes/", resourceType)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  putResourceType: function(idResourceType, resourceType) {
    return new Promise(function(resolve, reject) {
      Api.putRequestWithTokenHeader("/resourceTypes/" + idResourceType, resourceType)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  deleteResourceType: function(idResourceType) {
    return new Promise(function(resolve, reject) {
      Api.delRequestWithTokenHeader("/resourceTypes/" + idResourceType)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  }

};

module.exports = ResourceTypeService;
