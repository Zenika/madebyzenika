var Fluxxor = require("fluxxor");
var _ = require("lodash");
var ConstantsTechnology = require("../constants/technology");


var TechnologyStore = Fluxxor.createStore({

  initialize: function() {
    this.technologies = {};

    this.technologiesByProject = [];

    this.bindActions(
      ConstantsTechnology.LOAD_TECHNOLOGIES_SUCCESS, this.onLoadTechnologiesSuccess,
      ConstantsTechnology.LOAD_TECHNOLOGIES_FAIL, this.onLoadTechnologiesFail,
      ConstantsTechnology.LOAD_TECHNOLOGIES_BY_PROJECT_ID_SUCCESS, this.onLoadTechnologiesByProjectIdSuccess,
      ConstantsTechnology.LOAD_TECHNOLOGIES_BY_PROJECT_ID_FAIL, this.onLoadTechnologiesByProjectIdFail,
      ConstantsTechnology.CLEAR_TECHNOLOGIES, this.clearTechnologies
    );
  },

  onLoadTechnologiesSuccess: function(data) {
    this.technologies = data;
    this.emit("change");
  },

  onLoadTechnologiesFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  onLoadTechnologiesByProjectIdSuccess: function(data) {
    this.technologiesByProject.push(data);
    this.emit("change");
  },

  onLoadTechnologiesByProjectIdFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  getTechnologyById: function(id) {
    return _.result(_.find(this.technologies, { "id": id }), "name");
  },

  clearTechnologies: function(){
    this.technologies = {};
  }
});

module.exports = TechnologyStore;
