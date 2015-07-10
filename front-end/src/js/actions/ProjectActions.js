var ConstantsProject = require("../constants/project");
var ProjectService = require("../utils/ServiceRest/ProjectService");

var ProjectActions = {

  loadProjects: function(skip, limit) {
    ProjectService.getProjectsPaginate(skip, limit).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_PROJECTS_SUCCESS, { skip: skip, projects: res.body});
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProject.LOAD_PROJECTS_FAIL, {error: err});
    }.bind(this));
  },

  loadNextProjects: function(skip, limit) {
    ProjectService.getProjectsPaginate(skip, limit).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_NEXT_PROJECTS_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProject.LOAD_NEXT_PROJECTS_FAIL, {error: err});
    }.bind(this));
  },

  updatePagination: function(skip, limit) {
      this.dispatch(ConstantsProject.UPDATE_PAGINATION, {skip: skip, limit: limit});
  },

  loadProjectById: function(id) {
    ProjectService.getProject(id).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_PROJECT_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProject.LOAD_PROJECT_FAIL, {error: err});
    }.bind(this));
  },

  loadProjectsByTechnologies: function(skip, limit, technologies) {
    ProjectService.getProjectsByTechnologies(skip, limit, technologies).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_TECHNOLOGIES_SUCCESS, { skip: skip, projects: res.body});
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_TECHNOLOGIES_FAIL, {error: err});
    }.bind(this));
  },

  loadProjectsByType: function(skip, limit, type) {
    ProjectService.getProjectsByType(skip, limit, type).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_TYPE_SUCCESS, { skip: skip, projects: res.body});
    }.bind(this), function(err) {
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_TYPE_FAIL, {error: err});
    }.bind(this))
  },

  loadProjectsByTypeAndTechnologies: function(skip, limit, type, technologies) {
    ProjectService.getProjectsByTypeAndTechnologies(skip, limit, type, technologies).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_TECHNOLOGIES_SUCCESS, { skip: skip, projects: res.body});
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_TECHNOLOGIES_FAIL, {error: err});
    }.bind(this));
  },

  loadProjectsByUser: function(userId) {
    ProjectService.getProjectsByUser(userId).then(function(res) {
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_USER_SUCCESS, res.body);
    }.bind(this), function(err) {
      console.log(err);
      this.dispatch(ConstantsProject.LOAD_PROJECTS_BY_USER_FAIL, {error: err});
    }.bind(this));
  },

  getFilter: function(filter) {
      this.dispatch(ConstantsProject.FILTER, filter);
  },


  getProjectById: function(id) {
    return new Promise(function(resolve, reject) {
      ProjectService.getProject(id).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  postProject: function(project) {
    return new Promise(function(resolve, reject) {
      ProjectService.postProject(project).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  putProject: function(idProject, project) {
    return new Promise(function(resolve, reject) {
      ProjectService.putProject(idProject, project).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  deleteProject: function(idProject) {
    return new Promise(function(resolve, reject) {
      ProjectService.deleteProject(idProject).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  clearProject: function() {
    this.dispatch(ConstantsProject.CLEAR_PROJECT);
  },

  clearProjectByTechnologie: function() {
    this.dispatch(ConstantsProject.CLEAR_PROJECTS_BY_TECHNOLOGY);
  }
};

module.exports = ProjectActions;
