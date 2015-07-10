var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var ProjectService = {

  getProjects: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects/")
          .end(function(err, res){
              if (err) { reject(err); }
              else { resolve(res); }
          });
    });
  },

  getProjectsPaginate: function(skip, limit) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects")
          .query({ skip: skip })
          .query({ limit: limit })
          .end(function(err, res){
              if (err) { reject(err); }
              else { resolve(res); }
          });
    });
  },

  getProjectsByType: function(skip, limit, type) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects")
         .query({ skip: skip })
         .query({ limit: limit })
         .query({ type: type})
         .end(function(err, res){
           if (err) { reject(err); }
           else { resolve(res); }
         });
    });
  },

  getProjectsByTechnologies: function(skip, limit, technologyId) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects")
         .query({ skip: skip })
         .query({ limit: limit })
         .query({ technologies: technologyId })
         .end(function(err, res){
           if (err) { reject(err); }
           else { resolve(res); }
         });
    });
  },

  getProjectsByTypeAndTechnologies: function(skip, limit, type, technologies) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects")
         .query({ skip: skip })
         .query({ limit: limit })
         .query({ type: type })
         .query({ technologies: technologies })
         .end(function(err, res){
           if (err) { reject(err); }
           else { resolve(res); }
         });
    });
  },

  getProjectsByUser: function(userId) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects")
         .query({ user: userId })
         .end(function(err, res){
           if (err) { reject(err); }
           else { resolve(res); }
         });
    });
  },

  getProject: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projects/" + id)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  postProject: function(project) {
    console.log(project);
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/projects/", project)
         .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  putProject: function(idProject, project) {
    return new Promise(function(resolve, reject) {
      Api.putRequestWithTokenHeader("/projects/" + idProject, project)
         .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  deleteProject: function(idProject) {
    return new Promise(function(resolve, reject) {
      Api.delRequestWithTokenHeader("/projects/" + idProject)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
        });
    });
  }
};

module.exports = ProjectService;
