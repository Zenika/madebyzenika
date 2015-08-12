var Reflux = require("reflux");
var ProjectTypeService = require("../../utils/ServiceRest/ProjectTypeService");

var ProjectTypeActions = Reflux.createActions({
    "loadProjectTypes": {children: ["completed","failed"]}
});

ProjectTypeActions.loadProjectTypes.listen(function() {

  var thisAction = this;

  ProjectTypeService.getProjectTypes().then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

module.exports = ProjectTypeActions;
