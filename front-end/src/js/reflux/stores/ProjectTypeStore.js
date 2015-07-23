var Reflux = require("reflux");
var ProjectTypeActions = require("../actions/ProjectTypeActions");

var ProjectTypeStore = Reflux.createStore({
  data: {
    projectTypes: []
  },

  init: function() {
    this.listenToMany(ProjectTypeActions);
  },

  onLoadProjectTypesCompleted: function(projectTypes) {
      this.data.projectTypes = projectTypes;
      this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = ProjectTypeStore;
