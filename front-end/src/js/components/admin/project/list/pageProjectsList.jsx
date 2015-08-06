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
                              Gérer les événements
                            </Link>
                          </td>
                          <td>
                            <Link to="AdminResourcesByProjects" className="btn btn-primary" params={{projectId: project.id}}>
                              Gérer les ressources
                            </Link>
                          </td>
                          <td>
                            <Link to="PageAdminUsersByProject" className="btn btn-primary" params={{projectId: project.id}}>
                              Gérer les membres
                            </Link>
                          </td>
                          <td>
                            <ButtonDeleteProject projectId={project.id} />
                          </td>
                        </tr>
                      );
                    }.bind(this))}
                  </tbody>
                </Table>
    </div>
    );
  }

});

module.exports = pageProjects;
