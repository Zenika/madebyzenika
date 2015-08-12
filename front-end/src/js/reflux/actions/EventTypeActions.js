var Reflux = require("reflux");
var EventTypeService = require("../../utils/ServiceRest/EventTypeService");

var EventTypeActions = Reflux.createActions({
    "loadEventTypes": {children: ["completed","failed"]},
    "loadEventTypeById": {children: ["completed","failed"]}
});

// Get event types
EventTypeActions.loadEventTypes.listen(function() {

  var thisAction = this;

  EventTypeService.getEventTypes().then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get event types by id
EventTypeActions.loadEventTypeById.listen(function(id) {

  var thisAction = this;

  EventTypeService.getEventType(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

module.exports = EventTypeActions;
