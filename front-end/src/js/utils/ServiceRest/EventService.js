var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var EventService = {

  getEvents: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/events/")
        .end(function(err, res){
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  getEventsByProject: function(projectId) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/events?project=" + projectId)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
         });
    });
  },

  getEvent: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/events/" + id)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
        });
    });
  },

  postEvent: function(event) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/events/", event)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  postListEvents: function(events) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/events/list", events)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  putEvent: function(idEvent, event) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/events/" + idEvent, event)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
        });
    });
  },

  deleteEvent: function(idEvent) {
    return new Promise(function(resolve, reject) {
      Api.delRequestWithTokenHeader("/events/" + idEvent)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
        });
    });
  }

};

module.exports = EventService;
