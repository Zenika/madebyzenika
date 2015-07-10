var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var ResourceService = {

  getResources: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resources")
        .end(function(err, res){
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  getResource: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resources/" + id)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
         });
    });
  },

  getResourcesByProject: function(projectId) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resources?project=" + projectId)
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  getResourcesByEvent: function(eventId) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/resources?event=" + eventId)
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  postResource: function(resource) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/resources/", resource)
         .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  putResource: function(id, resource) {
    return new Promise(function(resolve, reject) {
      Api.putRequestWithTokenHeader("/resources/" + id, resource)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  deleteResource: function(id) {
    return new Promise(function(resolve, reject) {
      Api.delRequestWithTokenHeader("/resources/" + id)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  }
};

module.exports = ResourceService;
