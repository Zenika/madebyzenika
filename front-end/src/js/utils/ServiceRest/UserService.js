var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var UserService = {

  getUsers: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/users/")
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  getUserById: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/users/" + id)
      .end(function(err, res) {
        if(err) { reject(err); }
        else { resolve(res); }
      })
    });
  },

  getUsersByProject: function(projectId) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/users/")
      .query({ project: projectId })
      .end(function(err, res) {
        if(err) { reject(err); }
        else { resolve(res); }
      })
    });
  }
};

module.exports = UserService;
