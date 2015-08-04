var Reflux = require("reflux");
var TechnologyService = require("../../utils/ServiceRest/TechnologyService");
var ProjectService = require("../../utils/ServiceRest/ProjectService");

var TechnologyActions = Reflux.createActions({
    "loadTechnologies": {children: ["completed","failed"]},
    "loadTechnology": {children: ["completed","failed"]},
    "loadTechnologiesByProjectId": {children: ["completed","failed"]},
    "loadTechnologiesByName": {children: ["completed","failed"]},
    "loadTechnologiesByScore": {children: ["completed","failed"]},
});

TechnologyActions.loadTechnologies.listen(function() {

  var thisAction = this;

  TechnologyService.getTechnologies().then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

TechnologyActions.loadTechnology.listen(function(id) {

  var thisAction = this;

  TechnologyService.getTechnology(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

TechnologyActions.loadTechnologiesByProjectId.listen(function(projectId) {
  var thisAction = this;

  TechnologyService.getTechnologiesByProjectId(projectId).then(function(res) {
    return thisAction.completed(projectId, res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

TechnologyActions.loadTechnologiesByName.listen(function(name) {
  var thisAction = this;

  TechnologyService.getTechnologiesByName(name).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

TechnologyActions.loadTechnologiesByScore.listen(function() {

  var thisAction = this;

  ProjectService.getProjects().then(function(res) {
    var projects = res.body;

    TechnologyService.getTechnologies().then(function(res) {
      return thisAction.completed(projects, res.body);
    }, function(err) {
      return thisActions.failed(err);
    });

  }, function(err) {
    return thisActions.failed(err);
  });

});

module.exports = TechnologyActions;
