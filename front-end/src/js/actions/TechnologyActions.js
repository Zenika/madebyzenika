var ConstantsTechnology = require("../constants/technology");
var TechnologyService = require("../utils/ServiceRest/TechnologyService");

var TechnologyActions = {

  loadTechnologies: function() {
    TechnologyService.getTechnologies().then(function(res) {
      this.dispatch(ConstantsTechnology.LOAD_TECHNOLOGIES_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsTechnology.LOAD_TECHNOLOGIES_FAIL, {error: err});
    }.bind(this));
  },

  loadTechnologiesByProjectId: function(projectId) {
    TechnologyService.getTechnologiesByProjectId(projectId).then(function(res) {
      this.dispatch(ConstantsTechnology.LOAD_TECHNOLOGIES_BY_PROJECT_ID_SUCCESS, { projectId: projectId, technologies: res.body});
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsTechnology.LOAD_TECHNOLOGIES_BY_PROJECT_ID_FAIL, {error: err});
    }.bind(this));
  },

  postTechnology: function(technology) {
    return new Promise(function(resolve, reject) {
      TechnologyService.postTechnology(technology).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  postListTechnologies: function(technologies) {
    return new Promise(function(resolve, reject) {
      TechnologyService.postListTechnologies(technologies).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  }

};

module.exports = TechnologyActions;
