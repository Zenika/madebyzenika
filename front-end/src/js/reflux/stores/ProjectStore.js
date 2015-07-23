var Reflux = require("reflux");
var ProjectActions = require("../actions/ProjectActions");

var FilterStore = require("./FilterStore");

var projectStore = Reflux.createStore({
  data: {
    project: {},
    projects: [],
    projectsByUser: []
  },

  init: function() {
    this.listenToMany(ProjectActions);
    this.listenTo(FilterStore, this.getProjectFilter);
  },

  getProjectFilter: function(filter) {
    ProjectActions.loadProjectsByFilter(filter);
  },

  onLoadProjectsByFilterCompleted: function(projects) {
    this.data.projects = projects;
    this.trigger(this.data);
  },

  onLoadProjectCompleted: function(project) {
    this.data.project = project;
    this.trigger(this.data);
  },

  onLoadProjectsCompleted: function(projects) {
    this.data.projects = projects;
    this.trigger(this.data);
  },

  onLoadProjectsByUserCompleted: function(projects) {
    this.data.projectsByUser = projects;
    this.trigger(this.data);
  },

  onClearProject: function() {
    this.data.project = {};
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = projectStore;
