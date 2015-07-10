var Fluxxor = require("fluxxor");
var ConstantsProjectType = require("../constants/projecttype");

var ProjectTypeStore = Fluxxor.createStore({

  initialize: function() {
    this.projectTypes = {};

    this.bindActions(
      ConstantsProjectType.LOAD_PROJECT_TYPES_SUCCESS, this.onLoadProjectTypesSuccess,
      ConstantsProjectType.LOAD_PROJECT_TYPES_FAIL, this.onLoadAllProjectTypesFail,
      ConstantsProjectType.CLEAR_PROJECT_TYPES, this.clearProjectTypes
    );
  },

  onLoadProjectTypesSuccess: function(data) {
    this.projectTypes = data;
    this.emit("change");
  },

  onLoadAllProjectTypesFail: function(error) {
    console.log(error);
    this.emit("change");
  },

  clearProjectTypes: function(){
    this.project = {};
  }
});

module.exports = ProjectTypeStore;
