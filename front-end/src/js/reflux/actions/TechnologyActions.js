var Reflux = require("reflux");
var TechnologyService = require("../../utils/ServiceRest/TechnologyService");

var TechnologyActions = Reflux.createActions({
    "loadTechnologies": {children: ["completed","failed"]},
    "loadTechnology": {children: ["completed","failed"]},
    "loadTechnologiesByProjectId": {children: ["completed","failed"]}
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


module.exports = TechnologyActions;
