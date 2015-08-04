var Promise = require("promise");
var Request = require("superagent");
var Api = require("../Api");

var EventTypeService = {

  getEventTypes: function() {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/eventTypes/")
         .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
         });
    });
  },

  getEventType: function(id) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/eventTypes/" + id)
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  getEventTypesByName: function(name) {
    return new Promise(function(resolve, reject) {
      Api.getRequestWithTokenHeader("/eventTypes")
        .query({ name: name })
        .end(function(err, res) {
            if (err) { reject(err); }
            else { resolve(res); }
        });
    });
  },

  postEventType: function (eventType) {
    return new Promise(function(resolve, reject) {
      Api.postRequestWithTokenHeader("/eventTypes/", eventType)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  putEventType: function(idEventType, eventType) {
    return new Promise(function(resolve, reject) {
      Api.putRequestWithTokenHeader("/eventTypes/" + idEventType, eventType)
        .end(function(err, res) {
          if (err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  deleteEventType: function(idEventType) {
    return new Promise(function(resolve, reject) {
      Api.delRequestWithTokenHeader("/eventTypes/" + idEventType)
         .end(function(err, res) {
           if (err) { reject(err); }
           else { resolve(res); }
        });
    });
  }

};

module.exports = EventTypeService;
