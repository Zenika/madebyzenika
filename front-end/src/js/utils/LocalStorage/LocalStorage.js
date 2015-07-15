var _ = require("lodash");

var LocalStorage = {

  set: function(itemName, data) {
    localStorage.setItem(itemName, JSON.stringify(data));
  },

  get: function(itemName) {
    return  JSON.parse(localStorage.getItem(itemName));
  },

  remove: function(itemName) {
    localStorage.removeItem(itemName);
  }

};

module.exports = LocalStorage;
