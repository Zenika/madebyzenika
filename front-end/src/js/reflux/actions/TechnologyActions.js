var Reflux = require("reflux");
var TechnologyService = require("../../utils/ServiceRest/TechnologyService");

var TechnologyActions = Reflux.createActions({
    "loadTechnologies": {children: ["completed","failed"]},
    "loadTechnologiesByProjectId": {children: ["completed","failed"]}
});

// Get project by Id
TechnologyActions.loadTechnologies.listen(function() {

  var thisAction = this;

  TechnologyService.getTechnologies().then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get all projects
TechnologyActions.loadTechnologiesByProjectId.listen(function(projectId) {
  var thisAction = this;

  TechnologyService.getTechnologiesByProjectId(projectId).then(function(res) {
    return thisAction.completed(projectId, res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});


module.exports = TechnologyActions;
