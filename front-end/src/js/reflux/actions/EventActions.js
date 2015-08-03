var Reflux = require("reflux");
var EventService = require("../../utils/ServiceRest/EventService");

var EventActions = Reflux.createActions({
    "loadEvent": {children: ["completed","failed"]},
    "loadEventsByProject": {children: ["completed","failed"]},
    "clearEvent": "clearEvent",
    "clearEventsByProject": "clearEventsByProject"
});

// Get event by Id
EventActions.loadEvent.listen(function(id) {

  var thisAction = this;

  EventService.getEvent(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get events by Project Id
EventActions.loadEventsByProject.listen(function(projectId) {

  var thisAction = this;

  EventService.getEventsByProject(projectId).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

module.exports = EventActions;
