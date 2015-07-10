var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var t = require("tcomb-form");
var Form = t.form.Form;

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ProjectInputsForm = require("../../../utils/form/projectInputsForm.jsx");
var ProjectTypeInputsForm = require("../../../utils/form/projectTypeInputsForm.jsx");
var TechnologyInputsForm = require("../../../utils/form/technologyInputsForm.jsx");
var PageTitle = require("../pageTitle.jsx");

var AddProject = React.createClass({
  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("ProjectTypeStore", "TechnologyStore", "ProjectStore")],

  getStateFromFlux: function() {
    return {
      options: this.getOptionsForm(),
      type: t.struct(ProjectInputsForm.ProjectInputTypes),
      value: this.getValueForm(),
      currentUser: this.props.user
    };
  },

  componentDidMount: function() {
    this.getFlux().actions.ProjectTypeActions.loadProjectTypes();
    this.getFlux().actions.TechnologyActions.loadTechnologies();

    var projectId = this.getRouteParamProjectId();
    if (projectId) { this.getFlux().actions.ProjectActions.loadProjectById(projectId); }
  },

  getRouteParamProjectId: function() {
    var params = this.context.router.getCurrentParams();
    return params.projectId;
  },

  getValueForm: function() {
    var project = this.getFlux().store("ProjectStore").project;
    return (this.getRouteParamProjectId() === project.id) ? project : false;
  },

  submit: function () {
    var value = this.refs.form.getValue();

    if (value) {
      var project = {};
      _.map(value, function(v, k) {
        project[k] = v;
      });

      if(!_.isEmpty(this.getValueForm())) {

        project.team = this.getValueForm().team;
        this.getFlux().actions.ProjectActions.putProject(this.getRouteParamProjectId(), project).then(function(newProject) {
          this.transitionTo("projectDetail", {projectId: newProject.id});
        }.bind(this), function(err) {
            console.log(err);
        });

      } else {
        project.team = [this.state.currentUser.id];
        this.getFlux().actions.ProjectActions.postProject(project).then(function(newProject) {
          this.transitionTo("projectDetail", {projectId: newProject.id});
        }.bind(this), function(err) {
            console.log(err);
        });

      }
      this.getFlux().actions.ProjectActions.clearProject();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(!nextProps.params.projectId) { this.setState({ value: null }); }
  },

  render: function() {
    console.log();
    var formTitle = function() { return (_.isEmpty(this.state.value)) ? "Ajouter un projet" : "Modifier le projet"; }.bind(this);
    return (
      <div id="page-wrapper">
        <div id="wrapper">
            <PageTitle title={formTitle()} />
            <hr />
            <Form ref="form" options={this.state.options} type={this.state.type} value={this.state.value}/>
            <button className="btn btn-success" onClick={this.submit}>
                { formTitle() }
            </button>
        </div>
      </div>
    );
  },

  getOptionsForm: function() {
    var flux = this.getFlux();

    var formOptions = {
        auto: "placeholders",
        hasError: true,
        fields: ProjectInputsForm.ProjectFields
    };

    var projectTypes = ProjectTypeInputsForm.getProjectTypesAsync(flux.store("ProjectTypeStore").projectTypes);

    var technologies = TechnologyInputsForm.getTechnologiesAsync(flux.store("TechnologyStore").technologies);

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

  componentWillUnmount:	function(){
    this.getFlux().actions.ProjectActions.clearProject();
  }

});

module.exports = AddProject;
