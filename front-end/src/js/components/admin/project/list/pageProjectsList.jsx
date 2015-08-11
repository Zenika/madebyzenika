var React = require("react");

var Reflux = require("reflux");
var ProjectStore = require("../../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../../reflux/actions/ProjectActions");

var AuthStore = require("../../../../reflux/stores/AuthStore");

var _ = require("lodash");

var Router = require("react-router");
var Link = Router.Link;

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var Button = Bootstrap.Button;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var DeleteProject = require("../deleteProject.jsx");
var ProjectType = require("../../../../utils/LocalStorage/ProjectType.jsx");

var PageTitle = require("../../pageTitle.jsx");

var HANDLE_EVENTS = "Gérer les événements";
var HANDLE_RESOURCES = "Gérer les ressources";
var HANDLE_USERS = "Gérer les membres";
var DELETE_PROJECT = "supprimer";
var pageProjects = React.createClass({

  mixins: [Reflux.connect(ProjectStore)],

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    ProjectActions.loadProjectsByUser(AuthStore.data.userInfo.id);
  },

  getInitialState: function() {
    return this.getState();
  },

  handleResize: function(e) {
    this.setState(this.getState());
  },

  getState: function() {
    if(window.innerWidth > 1040 && window.innerWidth < 1260) {
      return {
        windowWidth: window.innerWidth,
        buttonTitle: {
          event: "événements",
          resource: "ressources",
          user: "membres",
          delete: "x"
        },
        mobileSize: false
      };
    } else if(window.innerWidth < 1040) {
      return {
        windowWidth: window.innerWidth,
        buttonTitle: this.getLongButtonTitle(),
        mobileSize: true
      };
    }else {
      return {
        windowWidth: window.innerWidth,
        buttonTitle: this.getLongButtonTitle(),
        mobileSize: false
      };
    }
  },

  getLongButtonTitle: function() {
      return {
        event: HANDLE_EVENTS,
        resource: HANDLE_RESOURCES,
        user: HANDLE_USERS,
        delete: DELETE_PROJECT
      };
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    var projects = this.state.projectsByUser;

    return (
      <div>
          <PageTitle title="Mes projets" />
            <Link to="addProject" className="btn btn-success">Ajouter un projet</Link>

                <Table responsive className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Type de projet</th>
                    </tr>
                  </thead>
                  {this.renderActionButtons(projects)}
                </Table>
    </div>
    );
  },

  renderActionButtons: function(projects) {
    if(this.state.mobileSize) {
      return (
        <tbody>
          {_.map(projects, function(project) {
            return (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{_.trunc(project.description, {"length": 20, "separator": " "})}</td>
                <td><ProjectType bsStyle="info" projectType={project.projectType} /></td>
                <td>
                  <DropdownButton title="Actions" >
                    <MenuItem>
                      <Link to="updateProject" params={{projectId: project.id}}>Modifier</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="AdminEventsByProjects" params={{projectId: project.id}}>{this.state.buttonTitle.event}</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="AdminResourcesByProjects" params={{projectId: project.id}}>
                        {this.state.buttonTitle.resource}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="PageAdminUsersByProject" params={{projectId: project.id}}>
                        {this.state.buttonTitle.user}
                      </Link>
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem>
                      <DeleteProject projectId={project.id} title={this.state.buttonTitle.delete} isButton={false} />
                    </MenuItem>
                  </DropdownButton>
                </td>
              </tr>
            );
          }.bind(this))}
        </tbody>
      );
    } else {
      return (
        <tbody>
          {_.map(projects, function(project) {
            return (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{_.trunc(project.description, {"length": 20, "separator": " "})}</td>
                <td><ProjectType projectType={project.projectType} /></td>
                <td><Link to="updateProject" className="btn btn-warning"  params={{projectId: project.id}}>Modifier</Link></td>
                <td>
                  <Link to="AdminEventsByProjects" className="btn btn-primary" params={{projectId: project.id}}>
                    {this.state.buttonTitle.event}
                  </Link>
                </td>
                <td>
                  <Link to="AdminResourcesByProjects" className="btn btn-primary" params={{projectId: project.id}}>
                    {this.state.buttonTitle.resource}
                  </Link>
                </td>
                <td>
                  <Link to="PageAdminUsersByProject" className="btn btn-primary" params={{projectId: project.id}}>
                    {this.state.buttonTitle.user}
                  </Link>
                </td>
                <td>
                  <DeleteProject projectId={project.id} title={this.state.buttonTitle.delete} isButton={true} />
                </td>
              </tr>
            );
          }.bind(this))}
        </tbody>
      );
    }
  }

});

module.exports = pageProjects;
