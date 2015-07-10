var ConstantsProjectType = require("../constants/projecttype");
var ProjectTypeService = require("../utils/ServiceRest/ProjectTypeService");

var ProjectTypeActions = {

  loadProjectTypes: function() {
    ProjectTypeService.getProjectTypes().then(function(res) {
      this.dispatch(ConstantsProjectType.LOAD_PROJECT_TYPES_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProjectType.LOAD_PROJECT_TYPES_FAIL, {error: err});
    }.bind(this));
  },

  loadProjectTypesForEnum: function() {
    return new Promise(function(resolve, reject) {
      ProjectTypeService.getProjectTypes().then(function(res) {
        resolve(res.body);
      }, function(err) {
        reject({error: err});
      });
    });
  },

  clearProjectType: function() {
    this.dispatch(ConstantsProjectType.CLEAR_PROJECT_TYPES);
  }
};

module.exports = ProjectTypeActions;
