var React = require("react");
var Fluxxor = require("fluxxor");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var Button = Bootstrap.Button;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var ButtonDeleteProject = require("../buttonDeleteProject.jsx");
var ProjectType = require("../../../../utils/LocalStorage/ProjectType.jsx");

var PageTitle = require("../../pageTitle.jsx");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var pageProjects = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("ProjectStore","AuthStore","UserStore")],

  componentDidMount: function() {
    var flux = this.getFlux();
    var currentUserId = flux.store("AuthStore").userInfo.id;
    flux.actions.ProjectActions.loadProjectsByUser(currentUserId);
  },

  getStateFromFlux: function() {
    var flux = this.getFlux().store("ProjectStore");
    return {
      projects: flux.projectsByUser
    };
  },

  render: function() {
    this.props.pageTitle = "Liste de mes projets";
    return (
      <div id="page-wrapper">
        <div id="wrapper">
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
                  <tbody>
                    {_.map(this.state.projects, function(project) {
                      return (
                        <tr key={project.id}>
                          <td>{project.name}</td>
                          <td>{_.trunc(project.description, {"length": 20, "separator": " "})}</td>
                          <td><ProjectType projectType={project.projectType} /></td>
                          <td>{this.renderProjectActions(project.id)}</td>
                          <td>{this.renderEventActions(project.id)}</td>
                          <td>{this.renderResourceActions(project.id)}</td>
                          <td>{this.renderUserActions(project.id)}</td>
                        </tr>
                      );
                    }.bind(this))}
                  </tbody>
                </Table>
        </div>
    </div>
    );
  },

  renderProjectActions: function(projectId) {
    return (
      <DropdownButton title="Projet">
        <MenuItem eventKey="1">
          <Link to="updateProject" params={{projectId: projectId}}>Modifier</Link>
        </MenuItem>
        <MenuItem eventKey="2">
          <ButtonDeleteProject projectId={projectId} />
        </MenuItem>
      </DropdownButton>
    );
  },

  renderEventActions: function(projectId) {
    return (
      <DropdownButton title="Evénement">
        <MenuItem eventKey="1">
          <Link to="addEvent" params={{projectId: projectId}}>Ajouter un événement</Link>
        </MenuItem>
        <MenuItem eventKey="2">
          <Link to="AdminEventsByProjects" params={{projectId: projectId}}>
            Liste des événements
          </Link>
        </MenuItem>
      </DropdownButton>
    );
  },

  renderResourceActions: function(projectId) {
    return (
      <DropdownButton title="Ressource">
        <MenuItem eventKey="1">
          <Link to="addResourceToProject" params={{projectId: projectId}}>Ajouter une ressource</Link>
        </MenuItem>
        <MenuItem eventKey="2">
          <Link to="AdminResourcesByProjects" params={{projectId: projectId}}>
            Liste des ressources
          </Link>
        </MenuItem>
      </DropdownButton>
    );
  },

  renderUserActions: function(projectId) {
    return (
      <Link to="PageAdminUsersByProject" params={{projectId: projectId}}>
        <Button>Membres</Button>
      </Link>
    );
  }

});

module.exports = pageProjects;
