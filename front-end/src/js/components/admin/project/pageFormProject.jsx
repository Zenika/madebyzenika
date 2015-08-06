var React = require("react");
var _ = require("lodash");

var Router = require("react-router");

var t = require("tcomb-form");
var Form = t.form.Form;

var Reflux = require("reflux");

var ProjectStore = require("../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../reflux/actions/ProjectActions");

var ProjectTypeStore = require("../../../reflux/stores/ProjectTypeStore");
var ProjectTypeActions = require("../../../reflux/actions/ProjectTypeActions");

var TechnologyStore = require("../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../reflux/actions/TechnologyActions");

var NotificationStore = require("../../../reflux/stores/NotificationStore");
var NotificationActions = require("../../../reflux/actions/NotificationActions");

var AuthStore = require("../../../reflux/stores/AuthStore");

var ProjectService = require("../../../utils/ServiceRest/ProjectService");

var ProjectInputsForm = require("../../../utils/form/projectInputsForm.jsx");
var ProjectTypeInputsForm = require("../../../utils/form/projectTypeInputsForm.jsx");
var TechnologyInputsForm = require("../../../utils/form/technologyInputsForm.jsx");

var PageTitle = require("../pageTitle.jsx");

var pageFormProject = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ProjectStore), Reflux.connect(ProjectTypeStore), Reflux.connect(TechnologyStore), Reflux.connect(NotificationStore)],

  getInitialState: function() {
    return {
      type: t.struct(ProjectInputsForm.ProjectInputTypes)
    };
  },

  componentDidMount: function() {
    ProjectTypeActions.loadProjectTypes();
    TechnologyActions.loadTechnologies();

    var projectId = this.getRouteParamProjectId();
    if (projectId) { ProjectActions.loadProject(projectId); }
  },

  getRouteParamProjectId: function() {
    var params = this.context.router.getCurrentParams();
    return params.projectId;
  },

  submit: function () {
    var value = this.refs.form.getValue();
    if (value) {
      var project = {};
      _.map(value, function(v, k) {
        project[k] = v;
      });

      if(!_.isEmpty(this.state.project)) {

        project.team = this.state.project.team;
        project.owner = this.state.project.owner;

        ProjectService.putProject(this.getRouteParamProjectId(), project).then(function(res) {
          ProjectActions.clearProject();
          NotificationActions.setNotification("Le projet a bien été mis à jour", "success");
          this.transitionTo("projectDetail", {projectId: res.body.id});
        }.bind(this), function(err) {
          console.log(err);
          reject({error: err});
        });

      } else {

        project.team = [AuthStore.data.userInfo.id];
        project.owner = AuthStore.data.userInfo.id
        ProjectService.postProject(project).then(function(res) {
          ProjectActions.clearProject();
          NotificationActions.setNotification("Le projet a bien été ajouté", "success");
          this.transitionTo("projectDetail", {projectId: res.body.id});
        }.bind(this), function(err) {
          console.log(err);
        });

      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(!nextProps.params.projectId) { this.setState({ value: null }); }
  },

  render: function() {
    var formTitle = function() { return (_.isEmpty(this.state.project)) ? "Ajouter un projet" : "Modifier le projet"; }.bind(this);
    return (
      <div>
            <PageTitle title={formTitle()} />
            <hr />
            <Form ref="form" options={this.getOptionsForm()} type={this.state.type} value={this.state.project}/>
            <button className="btn btn-success" onClick={this.submit}>
                { formTitle() }
            </button>
      </div>
    );
  },

  getOptionsForm: function() {
    var formOptions = {
        auto: "placeholders",
        hasError: true,
        fields: ProjectInputsForm.ProjectFields
    };

    var projectTypes = ProjectTypeInputsForm.getProjectTypesAsync(this.state.projectTypes);

    var technologies = TechnologyInputsForm.getTechnologiesAsync(this.state.technologies);

    //Update options select projectType
    _.set(formOptions, "fields.projectType.options", projectTypes.optionsType);

    //Update validation for options select projectType
    _.set(ProjectInputsForm.ProjectInputTypes, "projectType", t.enums.of(projectTypes.formType));

    //Update options select for technology tags
    _.set(formOptions, "fields.technologies.optionsData", technologies);

    //Update validation for options select technologies
    // _.set(ProjectInputsForm.ProjectInputTypes, 'technologies', TechnologyInputsForm.arrayOfTagsTechnologies(technologies));

    return formOptions;
  },

  componentWillUnmount: function() {
    ProjectActions.clearProject();
  }

});

module.exports = pageFormProject;
