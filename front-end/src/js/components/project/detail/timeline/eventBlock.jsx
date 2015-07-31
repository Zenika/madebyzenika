var React = require("react");
var _ = require("lodash");
var moment = require("moment");

var Bootstrap = require("react-bootstrap");
var OverlayMixin = Bootstrap.OverlayMixin;
var Modal = Bootstrap.Modal;

var Reflux = require("reflux");
var ResourceStore = require("../../../../reflux/stores/ResourceStore");
var ResourceActions = require("../../../../reflux/actions/ResourceActions");

var EventType = require("../../../../utils/LocalStorage/EventType.jsx");

var EventBlock = React.createClass({

  mixins: [Reflux.connect(ResourceStore), OverlayMixin],

  componentDidMount: function() {
    ResourceActions.loadResourcesByEvent(this.props.event.id);
    moment.locale("fr");
  },

  getInitialState: function() {
      return {
        event: this.props.event,
        isModalOpen: false
      }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ event: nextProps.event });
  },

  onClick: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function() {
    var event = this.state.event;
    var resourcesByEvent = this.state.resourcesByEvent[event.id];
    var sizeResourcesByEvent = _.size(resourcesByEvent);

    return (
      <div className="cd-timeline-block">
        <EventType eventType={event.eventType} icon={true} color={true} />

        <div className="cd-timeline-content">
          <h2>{event.name}</h2>
          <EventType eventType={event.eventType} label={true} />
          <p>{event.description}</p>
          {( sizeResourcesByEvent > 0) ? <button className="btn btn-info" onClick={this.onClick}>{sizeResourcesByEvent} ressources rattachées</button> : null}
          <span className="cd-date">
            {moment(event.dateStart).format('LL')} {(event.dateEnd !== null) ? "-" + moment(event.dateEnd).format('LL') : null }
          </span>
        </div>
      </div>
    );
  },



  renderOverlay: function() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }
    var eventId = this.state.event.id;
    return (
      <Modal title="Ressources rattachées à l'événement" onRequestHide={this.onClick}>
        <div className="modal-body text-danger">
          <div className="list-group">
          {_.map(this.state.resourcesByEvent[eventId], function(resource) {
            return <a key={resource.id} href={resource.link} target="_blank" className="list-group-item">{resource.name}</a>;
          })}
        </div>
        </div>
      </Modal>
    );
  }

});

module.exports = EventBlock;
