var ConstantsEventType = require("../constants/eventType");
var EventTypeService = require("../utils/ServiceRest/EventTypeService");

var EventTypeActions = {

  loadEventTypes: function() {
    EventTypeService.getEventTypes().then(function(res) {
      this.dispatch(ConstantsEventType.LOAD_EVENT_TYPES_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsEventType.LOAD_EVENT_TYPES_FAIL, {error: err});
    }.bind(this));
  },

  loadEventTypesForEnum: function() {
    return new Promise(function(resolve, reject) {
      EventTypeService.getEventTypes().then(function(res) {
        resolve(res.body);
      }, function(err) {
        reject({error: err});
      });
    });
  },

  loadEventTypeById: function(id) {
    EventTypeService.getEventType(id).then(function(res) {
      this.dispatch(ConstantsEventType.LOAD_EVENT_TYPE_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsEventType.LOAD_EVENT_TYPE_FAIL, {error: err});
    }.bind(this));
  },

  postEventType: function(EventType) {
    return new Promise(function(resolve, reject) {
      EventTypeService.postEventType(EventType).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  putEventType: function(idEventType, EventType) {
    return new Promise(function(resolve, reject) {
      EventTypeService.putEventType(idEventType, EventType).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  deleteEventType: function(idEventType) {
    return new Promise(function(resolve, reject) {
      EventTypeService.deleteEventType(idEventType).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  clearEventType: function() {
    this.dispatch(ConstantsEventType.CLEAR_EVENT_TYPES);
  }
};

module.exports = EventTypeActions;
