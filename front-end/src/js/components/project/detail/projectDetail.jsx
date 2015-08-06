var React = require("react");
var Reflux = require("reflux");

var Bootstrap = require("react-bootstrap");
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var ProjectStore = require("../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../reflux/actions/ProjectActions");

var AuthStore = require("../../../reflux/stores/AuthStore");
var AuthActions = require("../../../reflux/actions/AuthActions");

var Router = require("react-router");
var Link = Router.Link;

var TimeLine = require("./timeline/timeLine.jsx");
var ListMembersProject = require("./listMembersProject.jsx");
var TechnologiesProject = require("./projectTechnologies.jsx");
var ResourcesProject = require("./projectResources.jsx");
var EventsProject = require("./projectEvents.jsx");

var TAB_MEANS = "means";
var TAB_TIMELINE = "timeline";

var projectDetail = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ProjectStore)],

  getInitialState: function() {
      return {
        tab: TAB_MEANS
      }
  },

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  userAuthIsInProject: function(currentProject) {
    var currentUserId = AuthStore.data.userInfo.id;
    var teamProject = currentProject.team;
    return _.indexOf(teamProject, currentUserId) > -1;
  },

  componentDidMount: function() {
    ProjectActions.loadProject(this.getProjectId());
  },

  handleSelectedTab: function (selectedKey) {
    this.setState({ tab: selectedKey });
  },

  render: function() {
    var project = this.state.project;
    var userIsInProject = this.userAuthIsInProject(project);

    return (
      <div className="project-detail">
        <div className="row">
          <div className="col-md-12">
              <h1 className="name text-center">{_.trim(project.name)}</h1>
              <blockquote>
                <p className="lead text-center">{_.trim(project.description)}</p>
              </blockquote>
              {(userIsInProject) ? this.renderButtonAdmin(project) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Nav bsStyle='tabs' activeKey={this.state.tab} onSelect={this.handleSelectedTab}>
              <NavItem eventKey={TAB_MEANS} title='Les moyens'><i className="fa fa-gears"></i> Les moyens</NavItem>
              <NavItem eventKey={TAB_TIMELINE} title='La timeline'><i className="fa fa-clock-o"></i> La timeline</NavItem>
            </Nav>
          </div>
        </div>
        <div className="row content-tab">
          {this.tabSelected()}
        </div>
      </div>
    );
  },

  renderButtonAdmin: function(project) {
    if(project.id) {
      return (
        <div className="text-center">
          <DropdownButton title="Gérer le projet" bsStyle="primary">
            <MenuItem eventKey='1'>
              <Link to="updateProject" params={{projectId: project.id}}>
                <i className="fa fa-desktop"></i> Modifier le projet
              </Link>
            </MenuItem>
            <MenuItem eventKey='1'>
              <Link to="AdminEventsByProjects" params={{projectId: project.id}}>
                <i className="fa fa-bullhorn"></i> Gérer les événements
              </Link>
            </MenuItem>
            <MenuItem eventKey='2'>
              <Link to="AdminResourcesByProjects" params={{projectId: project.id}}>
                <i className="fa fa-book"></i> Gérer les ressources
              </Link>
            </MenuItem>
            <MenuItem eventKey='3'>
               <Link to="PageAdminUsersByProject" params={{projectId: project.id}}>
                 <i className="fa fa-users"></i> Gérer les membres
               </Link>
            </MenuItem>
          </DropdownButton>
        </div>
      );
    }
  },

  tabSelected: function() {
    if(this.state.tab == TAB_MEANS) {
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
    } else if(this.state.tab == TAB_TIMELINE) {
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
