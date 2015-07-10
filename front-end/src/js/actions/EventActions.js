var ConstantsEvent = require("../constants/event");
var EventService = require("../utils/ServiceRest/EventService");

var EventActions = {

  loadEvent: function(id) {
      EventService.getEvent(id).then(function(res) {
        this.dispatch(ConstantsEvent.LOAD_EVENT_SUCCESS, res.body);
      }.bind(this), function(err) {
        console.log(err);
        this.dispatch(ConstantsEvent.LOAD_EVENT_FAIL, {error: err});
      }.bind(this));
  },

  loadEventsByProject: function(projectId) {
    EventService.getEventsByProject(projectId).then(function(res) {
      this.dispatch(ConstantsEvent.LOAD_EVENTS_BY_PROJECT_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsEvent.LOAD_EVENTS_BY_PROJECT_FAIL, {error: err});
    }.bind(this));
  },

  postEvent: function(event) {
    return new Promise(function(resolve, reject) {
      EventService.postEvent(event).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  postListEvents: function(events) {
    return new Promise(function(resolve, reject) {
      EventService.postListEvents(events).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  putEvent: function(idEvent, event) {
    return new Promise(function(resolve, reject) {
      EventService.putEvent(idEvent, event).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  deleteEvent: function(idEvent) {
    return new Promise(function(resolve, reject) {
      EventService.deleteEvent(idEvent).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  clearEventsByProject: function() {
    this.dispatch(ConstantsEvent.CLEAR_EVENTS_BY_PROJECT);
  }

};

module.exports = EventActions;
