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

var ButtonDeleteProject = require("../buttonDeleteProject.jsx");
var ProjectType = require("../../../../utils/LocalStorage/ProjectType.jsx");

var PageTitle = require("../../pageTitle.jsx");

var pageProjects = React.createClass({

  mixins: [Reflux.connect(ProjectStore)],

  componentDidMount: function() {
    ProjectActions.loadProjectsByUser(AuthStore.data.userInfo.id);
  },


  render: function() {
    var projects = this.state.projectsByUser;
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
                    {_.map(projects, function(project) {
                      return (
                        <tr key={project.id}>
                          <td>{project.name}</td>
                          <td>{_.trunc(project.description, {"length": 20, "separator": " "})}</td>
                          <td><ProjectType projectType={project.projectType} /></td>
                          <td>{this.renderProjectActions(project.id)}</td>
                          <td>
                              <Link to="AdminEventsByProjects" className="btn btn-primary" params={{projectId: project.id}}>
                                Les événements
                              </Link>
                          </td>
                          <td>
                            <Link to="AdminResourcesByProjects" className="btn btn-primary" params={{projectId: project.id}}>
                              Les ressources
                            </Link>
                          </td>
                          <td>
                            <Link to="PageAdminUsersByProject" className="btn btn-primary" params={{projectId: project.id}}>
                              Les membres
                            </Link>
                          </td>
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
