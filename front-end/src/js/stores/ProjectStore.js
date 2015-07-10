var Fluxxor = require("fluxxor");
var ConstantsProject = require("../constants/project");
var _ = require("lodash");

var ProjectStore = Fluxxor.createStore({
  initialize: function() {
    this.project = {};

    this.projects = {};

    this.pagination = {skip: 0, limit: 1};

    this.projectsByTechnology = {};

    this.projectsByUser = {};

    this.projectsFilter = [];

    this.filter = {
      type: null,
      technologies: null
    };

    this.bindActions(
      ConstantsProject.LOAD_PROJECTS_SUCCESS, this.onLoadAllProjectsSuccess,
      ConstantsProject.LOAD_PROJECTS_FAIL, this.onLoadAllProjectsFail,

      ConstantsProject.LOAD_PROJECT_SUCCESS, this.onLoadProjectSuccess,
      ConstantsProject.LOAD_PROJECT_FAIL, this.onLoadProjectFail,

      ConstantsProject.LOAD_NEXT_PROJECTS_SUCCESS, this.onLoadNextProjectsSuccess,
      ConstantsProject.LOAD_NEXT_PROJECTS_FAIL, this.onLoadNextProjectsFail,

      ConstantsProject.LOAD_PROJECTS_BY_TECHNOLOGIES_SUCCESS, this.onLoadProjectsByTechnologiesSuccess,
      ConstantsProject.LOAD_PROJECTS_BY_TECHNOLOGIES_FAIL, this.onLoadProjectsByTechnologiesFail,

      ConstantsProject.LOAD_PROJECTS_BY_TYPE_SUCCESS, this.onLoadProjectsByTypeSuccess,
      ConstantsProject.LOAD_PROJECTS_BY_TYPE_FAIL, this.onLoadProjectsByTypeFail,

      ConstantsProject.LOAD_PROJECTS_BY_TYPE_AND_TECHNOLOGIES_SUCCESS, this.onLoadProjectsByTypeAndTechnologiesSuccess,
      ConstantsProject.LOAD_PROJECTS_BY_TYPE_AND_TECHNOLOGIES_FAIL, this.onLoadProjectsByTypeAndTechnologiesFail,

      ConstantsProject.LOAD_PROJECTS_BY_USER_SUCCESS, this.onLoadProjectByUserSuccess,
      ConstantsProject.LOAD_PROJECTS_BY_USER_FAIL, this.onLoadProjectByUserFail,

      ConstantsProject.FILTER, this.getFilter,

      ConstantsProject.UPDATE_PAGINATION, this.updatePagination,

      ConstantsProject.CLEAR_PROJECT, this.clearProject,
      ConstantsProject.CLEAR_PROJECTS_BY_TECHNOLOGY, this.clearProjectByTechnology
    );
  },

  getFilter: function(filter) {
    this.filter = filter;
    this.emit("change");
  },

  updatePagination: function(pagination) {
      this.pagination = pagination;
  },

  onLoadAllProjectsSuccess: function(data) {
    if(data.skip > 0 ){
      this.projectsFilter.push(data.projects);
      this.projectsFilter = _.flatten(this.projectsFilter)
    } else {
      this.projectsFilter = data.projects;
    }
    this.emit("change");
  },

  onLoadAllProjectsFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadNextProjectsSuccess: function(data) {
    this.projects = _.flatten([this.projects, data], true);
    this.projectsFilter = this.projects;
    this.emit("change");
  },

  onLoadNextProjectsFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadProjectsByTechnologiesSuccess: function(data) {
    if(data.skip > 0 ){
      this.projectsFilter.push(data.projects);
      this.projectsFilter = _.flatten(this.projectsFilter)
    } else {
      this.projectsFilter = data.projects;
    }
    this.emit("change");
  },

  onLoadProjectsByTechnologiesFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadProjectsByTypeSuccess: function(data) {
    if(data.skip > 0 ){
      this.projectsFilter.push(data.projects);
      this.projectsFilter = _.flatten(this.projectsFilter)
    } else {
      this.projectsFilter = data.projects;
    }
    this.emit("change");
  },

  onLoadProjectsByTypeFail: function(error) {
    console.log(error);
  },

  onLoadProjectsByTypeAndTechnologiesSuccess: function(data) {
    if(data.skip > 0 ){
      this.projectsFilter.push(data.projects);
      this.projectsFilter = _.flatten(this.projectsFilter)
    } else {
      this.projectsFilter = data.projects;
    }
    this.emit("change");
  },

  onLoadProjectsByTypeAndTechnologiesFail: function(error) {
    console.log(error);
  },

  onLoadProjectByUserSuccess: function(data) {
    this.projectsByUser = data;
    this.emit("change");
  },

  onLoadProjectByUserFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadProjectSuccess: function(data) {
    this.project = data;
    this.emit("change");
  },

  onLoadProjectFail: function(error) {
    this.project = false;
    console.log(error);
    this.emit("change");
  },

  clearProject: function(){
    this.project = {};
  },

  clearProjectByTechnology: function() {
    this.projectsByTechnology = {};
  }

});

module.exports = ProjectStore;


  //
  // filterByType: function(dataFiltering) {
  //   return _.filter(dataFiltering, function(project) {
  //     if(this.filter.type == null) {
  //       return true;
  //     } else {
  //       return project.projectType === this.filter.type;
  //     }
  //   }.bind(this));
  // },
  //
  // filterByTechnology: function(dataFiltering) {
  //   console.log(dataFiltering);
  //   return _.filter(dataFiltering, function(project) {
  //     if(this.filter.technology == null) {
  //       return true;
  //     } else {
  //       return _.indexOf(project.technologies, this.filter.technology) >= 0;
  //     }
  //   }.bind(this));
  // },
