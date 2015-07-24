var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var Reflux = require("reflux");
var ResourceTypeStore = require("../../../../reflux/stores/ResourceTypeStore");
var ResourceTypeActions = require("../../../../reflux/actions/ResourceTypeActions");

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var Button = Bootstrap.Button;
var PageTitle = require("../../pageTitle.jsx");

var PageResourceTypeList = React.createClass({

  mixins: [Reflux.connect(ResourceTypeStore)],

  componentDidMount: function() {
    ResourceTypeActions.loadResourceTypes();
  },

  render: function() {
    var resourceTypes = this.state.resourceTypes;

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title="Les types de ressource" />
            <Link to="addResourceType" className="btn btn-success">Ajouter un type de ressource</Link>

                <Table responsive className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Couleur</th>
                      <th>Icône</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(resourceTypes, function(resourceType) {
                      return (
                        <tr key={resourceType.id}>
                          <td>{resourceType.name}</td>
                          <td style={{background: resourceType.color, color:"black"}}>{resourceType.color}</td>
                          <td><i className={resourceType.classicon}></i></td>
                          <td>
                              <Link to="updateResourceType" className="btn btn-warning" params={{resourceTypeId: resourceType.id}}>
                                Modifier
                              </Link>
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
        </div>
    </div>
    )
  }

});

module.exports = PageResourceTypeList;
