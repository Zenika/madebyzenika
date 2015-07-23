var React = require("react");
var Reflux = require("reflux");

var ProjectStore = require("../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../reflux/actions/ProjectActions");

var Router = require("react-router");
var Link = Router.Link;


var ResourcesOfProject = require("./projectResources.jsx");
var TimeLine = require("./timeline/timeLine.jsx");
var ListMembersProject = require("./listMembersProject.jsx");

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
          <div className="col-md-12">
            <h3>Les membres du projet</h3>
            <ListMembersProject projectId={project.id} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 project-event">
            <TimeLine projectId={this.getProjectId()} />
          </div>
        </div>

      </div>
    );
  }

});

module.exports = projectDetail;
