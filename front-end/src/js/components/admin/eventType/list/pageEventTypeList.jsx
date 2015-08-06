var React = require("react");

var _ = require("lodash");

var Router = require("react-router");
var Link = Router.Link;

var Reflux = require("reflux");
var EventTypeStore = require("../../../../reflux/stores/EventTypeStore");
var EventTypeActions = require("../../../../reflux/actions/EventTypeActions");

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var Button = Bootstrap.Button;
var PageTitle = require("../../pageTitle.jsx");

var PageEventTypeList = React.createClass({

  mixins: [Reflux.connect(EventTypeStore)],

  componentDidMount: function() {
    EventTypeActions.loadEventTypes();
  },

  render: function() {
    var eventTypes = this.state.eventTypes;

    return (
      <div>
          <PageTitle title="Les types d'événement" />
            <Link to="addEventType" className="btn btn-success">Ajouter un type d'événement</Link>

                <Table responsive className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Couleur</th>
                      <th>Icône</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(eventTypes, function(eventType) {
                      return (
                        <tr key={eventType.id}>
                          <td>{eventType.name}</td>
                          <td style={{background: eventType.color, color:"black"}}>{eventType.color}</td>
                          <td><i className={"fa fa-"+eventType.classicon}></i></td>
                          <td>
                              <Link to="updateEventType" className="btn btn-warning" params={{eventTypeId: eventType.id}}>
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
    )
  }

});

module.exports = PageEventTypeList;
