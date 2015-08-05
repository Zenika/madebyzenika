var Reflux = require("reflux");
var TechnologyActions = require("../actions/TechnologyActions");

var TechnologyStore = Reflux.createStore({
  data: {
    technology: {},
    technologies: [],
    technologiesByProject: [],
    technologiesByName: [],
    technologiesByScore: []
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
    //console.log(projectId, technologiesByProject);
    this.data.technologiesByProject[projectId] = technologiesByProject;
    this.trigger(this.data);
  },

  onLoadTechnologiesByNameCompleted: function(technologies) {
    this.data.technologiesByName = technologies;
    this.trigger(this.data);
  },

  onLoadTechnologiesByScoreCompleted: function(projects, technologies) {

    var technologies = _.map(technologies, function(element) {
      return _.extend({}, element, {score: 0});
    });

    var allTechnologiesUsedInProject = _(projects).map(function(project) { return project.technologies; }).flatten().value();

     _.forEach(allTechnologiesUsedInProject, function(n, key) {
       if(!_.isEmpty(n)) {
         _.forEach(technologies, function(t, key) { if(t.id === n) { t.score ++; } });
       }
     })

    this.data.technologiesByScore = _.sortByOrder(technologies, ["score", "name"]).reverse();

    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = TechnologyStore;
