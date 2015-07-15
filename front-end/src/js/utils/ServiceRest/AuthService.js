var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var AuthService = {
  getAuthorizationCodeEvents: function(code) {
    return new Promise(function(resolve, reject) {
      Request.get(Api.getUrl() + "/oauth2callback")
        .set("Content-Type", "application/json")
        .query({ code: code })
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
      });
    });
  }
}

module.exports = AuthService;
