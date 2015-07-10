var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var ProjectTypeService = {

  getProjectTypes: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/projectTypes/")
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  }

};

module.exports = ProjectTypeService;
