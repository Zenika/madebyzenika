var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var TechnologyService = {

  getTechnologies: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/technologies/")
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  getTechnology: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/technologies/" + id)
        .end(function(err, res) {
        if (err) { reject(err); }
        else { resolve(res); }
        });
    });
  },

  getTechnologiesByProjectId: function(projectId) {
      return new Promise(function(resolve, reject) {
        Api.getRequestWithTokenHeader("/technologies")
          .query({ project: projectId })
          .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
          });
      });
  },

  getTechnologiesByName: function(name) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/technologies")
        .query({ name: name })
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  postTechnology: function(technology) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/technologies/", technology)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  postListTechnologies: function(technologies) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/technologies/list", technologies)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  }
};

module.exports = TechnologyService;
