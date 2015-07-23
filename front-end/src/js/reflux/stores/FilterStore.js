var Reflux = require("reflux");
var FilterActions = require("../actions/FilterActions");

var filterStore = Reflux.createStore({
  data: {
    filter: { type: "all", technologies: "all"}
  },

  init: function() {
    this.listenToMany(FilterActions);
  },

  onGetFilter: function(type, technologies) {
    this.data.filter.type = type;
    this.data.filter.technologies = technologies;
    this.trigger(this.data);
  },


  getInitialState: function() {
    return this.data;
  }

});

module.exports = filterStore;
