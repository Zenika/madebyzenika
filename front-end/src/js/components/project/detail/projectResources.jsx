var React = require("react");
var Reflux = require("reflux");
var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var moment = require("moment");

var Reflux = require("reflux");
var ResourceStore = require("../../../reflux/stores/ResourceStore");
var ResourceActions = require("../../../reflux/actions/ResourceActions");

var ResourceType = require("../../../utils/LocalStorage/ResourceType.jsx");

var projectEvents = React.createClass({

  mixins: [Reflux.connect(ResourceStore)],

  componentDidMount: function() {
    moment.locale("fr");
    ResourceActions.loadResourcesByProject(this.props.projectId);
  },

  componentWillReceiveProps: function(nextProps) {
    ResourceActions.loadResourcesByProject(nextProps.projectId);
  },

  render: function() {
    var resources = this.state.resourcesByProject;
    var nbResources = 0;
    if( resources ) nbResources = resources.length;

    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading"><h3><i className="fa fa-book"></i> {nbResources} ressources</h3></div>
          <div className="panel-body">
                <Table responsive className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Dernière MAJ</th>
                      <th>Type de ressource</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(resources, function(resource) {
                      return (
                        <tr key={resource.id}>
                          <td>{resource.name}</td>
                          <td>{moment(resource.lastModified).fromNow()}</td>
                          <td><ResourceType resourceType={resource.resourceType} /></td>
                          <td><a href={resource.link} className="btn btn-info" target="_blank"><i className="fa fa-eye"></i></a></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = projectEvents;
