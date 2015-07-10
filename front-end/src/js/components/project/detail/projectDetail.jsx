var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");
var Link = Router.Link;

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ResourcesOfProject = require("./projectResources.jsx");
var TimeLine = require("./timeline/timeLine.jsx");
var ThumbProjectUser = require("../../admin/user/list/thumbProjectUser.jsx");

var projectDetail = React.createClass({

  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("ProjectStore","UserStore")],

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  componentDidMount: function() {
    this.getFlux().actions.ProjectActions.loadProjectById(this.getProjectId());
    this.getFlux().actions.UserActions.loadUsersByProject(this.getProjectId());
  },

  getStateFromFlux: function(){
    var flux = this.getFlux();
    return {
      project: flux.store("ProjectStore").project,
      teamProject: flux.store("UserStore").usersByProject,
      loading: flux.loading
    };
  },

  render: function() {
    var project = this.state.project;

    return (
      <div className="project-detail">
        <div className="row">
          <div className="col-md-12 project-name-description">
            <div className="col-md-4 name">
                <h1>{project.name}</h1>
            </div>
            <div className="col-md-8 description">
                <p>{project.description}</p>
            </div>
          </div>

        </div>
        <div className="row">
          <h4>Les membres du projet</h4>
            {_.map(this.state.teamProject, function(user) {
              return <ThumbProjectUser user={user} admin={false}  />;
            }.bind(this))}
        </div>
        <div className="row">
          <div className="col-md-12 project-event">
            <TimeLine projectId={this.getProjectId()} />
          </div>
        </div>

      </div>
    );
  },

  componentWillUnmount:	function(){
    this.getFlux().actions.ProjectActions.clearProject();
  }
});

module.exports = projectDetail;

// Modif et Supp Projet
// <Link to="updateProject" params={{projectId: this.getProjectId()}} className="btn btn-warning">Modifier le projet</Link>
// <ButtonDeleteProject projectId={project.id} />

// <div className="col-md-3 project-resource">
//   <ResourcesOfProject projectId={this.getProjectId()} />
// </div>
