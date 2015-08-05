var React = require("react");
var Reflux = require("reflux");
var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var OverlayMixin = Bootstrap.OverlayMixin;
var Modal = Bootstrap.Modal;

var moment = require("moment");

var Reflux = require("reflux");
var EventStore = require("../../../reflux/stores/EventStore");
var EventActions = require("../../../reflux/actions/EventActions");

var ResourceService = require("../../../utils/ServiceRest/ResourceService");

var EventType = require("../../../utils/LocalStorage/EventType.jsx");

var projectEvents = React.createClass({

  mixins: [OverlayMixin, Reflux.connect(EventStore)],

  componentDidMount: function() {
    moment.locale("fr");
    EventActions.loadEventsByProject(this.props.projectId);
  },

  getInitialState: function() {
      return {
        isModalOpen: false,
        eventInModal: {}
      }
  },

  componentWillReceiveProps: function(nextProps) {
    EventActions.loadEventsByProject(nextProps.projectId);
  },

  onClick: function (event) {
    ResourceService.getResourcesByEvent(event.id).then(function(res) {

      this.setState({
        isModalOpen: !this.state.isModalOpen,
        eventInModal: event,
        resourcesEventInModal: res.body
      });

    }.bind(this), function(err) {
      console.log(err);
    });
  },

  render: function() {
    var events = this.state.eventsByProject;
    var nbEvents = 0;
    if( events ) nbEvents = events.length;
    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading"><h3><i className="fa fa-bullhorn"></i> {nbEvents} événements</h3></div>
          <div className="panel-body">
                <Table responsive className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Type d'événement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(events, function(event) {
                      return (
                        <tr key={event.id}>
                          <td>{event.name}</td>
                          <td>{_.trunc(event.description, {"length": 20, "separator": " "})}</td>
                          <td>{moment(event.dateStart).format('LL')} {(event.dateEnd !== null) ? "-" + moment(event.dateEnd).format('LL') : null }</td>
                          <td><EventType eventType={event.eventType} /></td>
                          <td><button className="btn btn-info" onClick={this.onClick.bind(null, event)}><i className="fa fa-eye"></i></button></td>
                        </tr>
                      );
                    }.bind(this))}
                  </tbody>
                </Table>
            </div>
          </div>
        </div>
    )
  },


  renderOverlay: function() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }
    console.log(this.state);
    var event = this.state.eventInModal;
    return (
      <Modal title="Détail de l'événement" onRequestHide={this.onClick}>
        <div className="modal-body">
          <h1 className="name text-center">{_.trim(event.name)}</h1>
          <h3 className="text-center">
            {moment(event.dateStart).format('LL')} {(event.dateEnd !== null) ? "-" + moment(event.dateEnd).format('LL') : null }
          </h3>
          <p className="text-center">
            {_.trim(event.description)}
          </p>
          {this.getResourcesByEvent(this.state.resourcesEventInModal)}
        </div>
      </Modal>
    );
  },

  getResourcesByEvent: function(resourcesEvent) {
    console.log(resourcesEvent);
    if(resourcesEvent.length > 0) {
      return (
        <div>
          <h4><i className="fa fa-book"></i> Ressources associées à cette événement :</h4>
          <div className="list-group">
            {_.map(this.state.resourcesEventInModal, function(resource) {
              return <a key={resource.id} href={resource.link} target="_blank" className="list-group-item">{resource.name}</a>;
            })}
          </div>
        </div>
      );
    }
  }

});

module.exports = projectEvents;
