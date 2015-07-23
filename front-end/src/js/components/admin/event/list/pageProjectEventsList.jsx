var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var Reflux = require("reflux");

var EventStore = require("../../../../reflux/stores/EventStore");
var EventActions = require("../../../../reflux/actions/EventActions");

var ButtonDeleteEvent = require("../buttonDeleteEvent.jsx");
var EventType = require("../../../../utils/LocalStorage/EventType.jsx");

var PageTitle = require("../../pageTitle.jsx");

var pageProjectEvents = React.createClass({

  mixins: [ Router.Navigation, Reflux.connect(EventStore)],

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  componentDidMount: function() {
    EventActions.loadEventsByProject(this.getProjectId());
  },

  render: function() {
    this.props.pageTitle = "Liste de mes projets";

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title="Liste des événements" />
            <Link  to="addEvent" params={{ projectId: this.getProjectId()}} className="btn btn-success">
              Ajouter un événement au projet
            </Link>
            <Table responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Type d'événement</th>
                </tr>
              </thead>
              <tbody>
                {_.map(this.state.eventsByProject, function(event) {
                  return (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{_.trunc(event.description, {"length": 20, "separator": " "})}</td>
                      <td><EventType eventType={event.eventType} /></td>
                      <td><Link to="updateEvent" params={{eventId: event.id}} className="btn btn-warning">Modifier</Link></td>
                      <td><ButtonDeleteEvent eventId={event.id} projectId={this.getProjectId()} /></td>
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

module.exports = pageProjectEvents;
