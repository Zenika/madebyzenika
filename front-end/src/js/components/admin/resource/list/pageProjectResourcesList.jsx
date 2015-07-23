var React = require("react");
//var Fluxxor = require("fluxxor");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var Reflux = require("reflux");
var ResourceStore = require("../../../../reflux/stores/ResourceStore");
var ResourceActions = require("../../../../reflux/actions/ResourceActions");

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var ButtonDeleteResource = require("../buttonDeleteResource.jsx");
var ResourceType = require("../../../../utils/LocalStorage/ResourceType.jsx");

var PageTitle = require("../../pageTitle.jsx");

// var FluxMixin = Fluxxor.FluxMixin(React);
// var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var pageProjectResources = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ResourceStore)],

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  componentDidMount: function() {
    ResourceActions.loadResourcesByProject(this.getProjectId());
  },

  render: function() {
    this.props.pageTitle = "Liste des ressources";

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title="Ressources du projet" />
            <Link to="addResourceToProject" className="btn btn-success" params={{ projectId: this.getProjectId()}} >
              Ajouter une ressource au projet
            </Link>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Lien</th>
                    <th>Type de ressource</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(this.state.resourcesByProject, function(resource) {
                    return (
                      <tr key={resource.id}>
                        <td>{resource.name}</td>
                        <td><a href={resource.link} className="btn btn-info" target="_blank">Accèder à la ressource</a></td>
                        <td><ResourceType resourceType={resource.resourceType} /></td>
                        <td>
                          <Link to="updateResource" className="btn btn-warning" params={{resourceId: resource.id, projectId: this.getProjectId()}}>
                            Modifier
                          </Link>
                        </td>
                        <td><ButtonDeleteResource resourceId={resource.id} projectId={this.getProjectId()} /></td>
                      </tr>
                    );
                  }.bind(this))}
                </tbody>
              </Table>
        </div>
    </div>
    );
  }

});

module.exports = pageProjectResources;
