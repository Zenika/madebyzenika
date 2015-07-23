var Reflux = require("reflux");
var ResourceService = require("../../utils/ServiceRest/ResourceService");

var ResourceActions = Reflux.createActions({
    "loadResourceById": {children: ["completed","failed"]},
    "loadResourcesByProject": {children: ["completed","failed"]},
    "loadResourcesByEvent": {children: ["completed","failed"]},
    "clearResource": "clearResource"
});

// Get resource by Id
ResourceActions.loadResourceById.listen(function(id) {
  var thisAction = this;

  ResourceService.getResource(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get resources by project
ResourceActions.loadResourcesByProject.listen(function(projectId) {
  var thisAction = this;

  ResourceService.getResourcesByProject(projectId).then(function(res) {
    return thisAction.completed(res.body);
  }.bind(this), function(err) {
    return thisActions.failed(err);
  }.bind(this));

});

// Get resources by event
ResourceActions.loadResourcesByEvent.listen(function(eventId) {
  var thisAction = this;

  ResourceService.getResourcesByEvent(eventId).then(function(res) {
    if(res.body){
      return thisAction.completed({eventId: eventId, res: res.body});
    }
  }, function(err) {
    return thisActions.failed(err);
  });
});

module.exports = ResourceActions;
