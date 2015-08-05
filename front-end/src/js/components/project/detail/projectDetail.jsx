var React = require("react");
var Reflux = require("reflux");
var Bootstrap = require("react-bootstrap");
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var ProjectStore = require("../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../reflux/actions/ProjectActions");

var Router = require("react-router");
var Link = Router.Link;


var TimeLine = require("./timeline/timeLine.jsx");
var ListMembersProject = require("./listMembersProject.jsx");
var TechnologiesProject = require("./projectTechnologies.jsx");
var ResourcesProject = require("./projectResources.jsx");
var EventsProject = require("./projectEvents.jsx");

var MEANS = "means";
var TIMELINE = "timeline";

var projectDetail = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ProjectStore)],

  getInitialState: function() {
      return {
        tab: MEANS
      }
  },

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  componentDidMount: function() {
    ProjectActions.loadProject(this.getProjectId());
  },

  handleSelect: function (selectedKey) {
    this.setState({ tab: selectedKey });
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
            <Nav bsStyle='tabs' activeKey={this.state.tab} onSelect={this.handleSelect}>
              <NavItem eventKey={MEANS} href='/home'><i className="fa fa-gears"></i> Les moyens</NavItem>
              <NavItem eventKey={TIMELINE} title='Item'><i className="fa fa-clock-o"></i> La timeline</NavItem>
            </Nav>
          </div>
        </div>
        <div className="row content-tab">
          {this.tabSelected()}
        </div>
      </div>
    );
  },

  tabSelected: function() {
    if(this.state.tab == MEANS) {
      return (
        <div>
          <div className="col-md-12">
            <div className="col-md-6">
              <ListMembersProject projectId={this.state.project.id} />
            </div>
            <div className="col-md-6">
              <TechnologiesProject projectId={this.state.project.id} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <ResourcesProject projectId={this.state.project.id} />
            </div>
            <div className="col-md-6">
              <EventsProject projectId={this.state.project.id} />
            </div>
          </div>
        </div>
      )
    } else if(this.state.tab == TIMELINE) {
      return (
        <div className="col-md-12 project-event">
          <TimeLine projectId={this.getProjectId()} />
        </div>
      );
    }

  },

  componentWillUnmount: function() {
    ProjectActions.clearProject();
  }

});

module.exports = projectDetail;
