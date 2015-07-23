var Reflux = require("reflux");
var ProjectService = require("../../utils/ServiceRest/ProjectService");

var projectActions = Reflux.createActions({
    "loadProjects": {children: ["completed","failed"]},
    "loadProjectsByUser": {children: ["completed","failed"]},
    "loadProjectsByFilter": {children: ["completed","failed"]},
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

// Get projects by user Id
projectActions.loadProjectsByFilter.listen(function(filter) {
  var technologies = filter.filter.technologies;
  var type = filter.filter.type;
  var thisAction = this;

  if(technologies == "all" && type == "all") {

      ProjectService.getProjects().then(function(res) {
        return thisAction.completed(res.body);
      }, function(err) {
        return thisActions.failed(err);
      });

  } else if(technologies == "all" && type != "all") {

      ProjectService.getProjectsByType(0, 20, type).then(function(res) {
        return thisAction.completed(res.body);
      }, function(err) {
        return thisActions.failed(err);
      })

  } else if(technologies != "all" && type == "all") {
    ProjectService.getProjectsByTechnologies(0, 20, technologies).then(function(res) {
      return thisAction.completed(res.body);
    }, function(err) {
      return thisActions.failed(err);
    });

  } else if(technologies != "all" && type != "all") {

    ProjectService.getProjectsByTypeAndTechnologies(0, 20, type, technologies).then(function(res) {
      return thisAction.completed(res.body);
    }, function(err) {
      return thisActions.failed(err);
    });

  }
});

module.exports = projectActions;
