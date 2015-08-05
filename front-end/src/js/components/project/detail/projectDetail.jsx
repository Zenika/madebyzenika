var React = require("react");
var Reflux = require("reflux");

var ProjectStore = require("../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../reflux/actions/ProjectActions");

var Router = require("react-router");
var Link = Router.Link;


var ResourcesOfProject = require("./projectResources.jsx");
var TimeLine = require("./timeline/timeLine.jsx");
var ListMembersProject = require("./listMembersProject.jsx");
var TechnologiesOfProject = require("./projectTechnologies.jsx");

var projectDetail = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ProjectStore)],

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  componentDidMount: function() {
    ProjectActions.loadProject(this.getProjectId());
  },

  render: function() {
    var project = this.state.project;

    return (
      <div className="project-detail">
        <div className="row">
          <div className="col-md-12">
                <h1 className="name text-center">{_.trim(project.name)}</h1>
              <blockquote>
                <p className="lead text-center">{_.trim(project.description)}</p>
              </blockquote>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <ListMembersProject projectId={project.id} />
            </div>
            <div className="col-md-6">
              <TechnologiesOfProject projectId={project.id} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 project-event">
            <h2 className="name text-center">timeline du projet</h2>
            <TimeLine projectId={this.getProjectId()} />
          </div>
        </div>
      </div>
    );
  },

  componentWillUnmount: function() {
    ProjectActions.clearProject();
  }

});

module.exports = projectDetail;
