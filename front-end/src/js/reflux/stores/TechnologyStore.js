var Reflux = require("reflux");
var TechnologyActions = require("../actions/TechnologyActions");

var TechnologyStore = Reflux.createStore({
  data: {
    technology: {},
    technologies: [],
    technologiesByProject: []
  },

  init: function() {
    this.listenToMany(TechnologyActions);
  },

  onLoadTechnologyCompleted: function(technology) {
      this.data.technology = technology;
      this.trigger(this.data);
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
