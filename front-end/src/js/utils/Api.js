var Request = require("superagent");
var store = require("./LocalStorage/LocalStorage");
module.exports = {

  tokenAttribut: "X-Auth-Token",

  localStorageToken: function() {
    return store.get("access_token");
  },

  getUrl: function() {
    return "/api";
  },

  getRequestWithTokenHeader: function(request) {
    return Request.get(this.getUrl() + request)
                  .set("Content-Type", "application/json")
                  .set(this.tokenAttribut, this.localStorageToken());
  },

  postRequestWithTokenHeader: function(request, data) {
    return  Request.post(this.getUrl() + request)
                   .set("Content-Type", "application/json")
                   .set(this.tokenAttribut, this.localStorageToken())
                   .send(data);
  },

  putRequestWithTokenHeader: function(request, data) {
    return  Request.put(this.getUrl() + request)
                   .set("Content-Type", "application/json")
                   .set(this.tokenAttribut, this.localStorageToken())
                   .send(data);
  },

  delRequestWithTokenHeader: function(request) {
    return  Request.del(this.getUrl() + request)
                   .set("Content-Type", "application/json")
                   .set(this.tokenAttribut, this.localStorageToken());
  }

};
