var Reflux = require("reflux");
var TechnologyActions = require("../actions/TechnologyActions");

var TechnologyStore = Reflux.createStore({
  data: {
    technologies: [],
    technologiesByProject: []
  },

  init: function() {
    this.listenToMany(TechnologyActions);
  },

  onLoadTechnologiesCompleted: function(technologies) {
      this.data.technologies = technologies;
      this.trigger(this.data);
  },

  onLoadTechnologiesByProjectIdCompleted: function(projectId, technologiesByProject) {
    this.data.technologiesByProject[projectId] = technologiesByProject;
    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = TechnologyStore;
