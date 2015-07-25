var Promise = require("promise");
var Request = require("superagent");

var FontelloService = {
  getFontIcons: function() {
    return new Promise(function(resolve, reject) {
      Request.get("/oauth2callback")
        .set("Content-Type", "application/json")
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
      });
    });
  }
}

module.exports = FontelloService;
