var Reflux = require("reflux");
var ProjectService = require("../../utils/ServiceRest/ProjectService");

var projectActions = Reflux.createActions({
    "loadProjects": {children: ["completed","failed"]},
    "loadProjectsByUser": {children: ["completed","failed"]},
    "loadProject": {children: ["completed","failed"]},
    "clearProject": "clearProject"
});

// Get project by Id
projectActions.loadProject.listen(function(id) {

  var thisAction = this;

  ProjectService.getProject(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get all projects
projectActions.loadProjects.listen(function() {

  var thisAction = this;

  ProjectService.getProjects().then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get projects by user Id
projectActions.loadProjectsByUser.listen(function(id) {

  var thisAction = this;
  ProjectService.getProjectsByUser(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

module.exports = projectActions;
