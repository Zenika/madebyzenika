var React = require("react");
var Fluxxor = require("fluxxor");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var ButtonDeleteEvent = require("../buttonDeleteEvent.jsx");
var EventType = require("../../../../utils/LocalStorage/EventType.jsx");

var PageTitle = require("../../pageTitle.jsx");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var pageProjectEvents = React.createClass({

  mixins: [ Router.Navigation, FluxMixin, StoreWatchMixin("EventStore")],

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  componentDidMount: function() {
    var flux = this.getFlux();
    this.getFlux().actions.EventActions.loadEventsByProject(this.getProjectId());
  },

  getStateFromFlux: function() {
    var flux = this.getFlux().store("EventStore");
    return {
      events: flux.eventsByProject
    };
  },

  render: function() {
    this.props.pageTitle = "Liste de mes projets";

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title="Liste des événements" />

            <Table responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Type d'événement</th>
                </tr>
              </thead>
              <tbody>
                {_.map(this.state.events, function(event) {
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
