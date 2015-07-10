var React = require("react");
var Fluxxor = require("fluxxor");
var store = require("./LocalStorage");
var _ = require("lodash");

var EventTypeActions = require("../../actions/EventTypeActions.js");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;


var EventType = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("EventTypeStore")],

  componentDidMount: function() {
    var flux = this.getFlux();
    if(_.isEmpty(this.getEventTypes())) {
      flux.actions.EventTypeActions.loadEventTypes();
    }
  },

  getStateFromFlux: function() {
    if(_.isEmpty(this.getEventTypes())) {
      this.fillLocalStorage(this.getFlux().store("EventTypeStore").eventTypes);
    }

    return {
      eventTypeId: this.props.eventType,
      eventTypes: this.getEventTypes()
    };
  },

  render: function() {
    var eventType = _.first(_.filter(this.state.eventTypes, "id", this.state.eventTypeId));

    if(eventType) {
      if (this.props.icon && this.props.color && eventType) {
        var style = { background: eventType.color };
        return (
          <div className="cd-timeline-img cd-icon" style={style}>
            <h3><i className={eventType.classicon}></i></h3>
          </div>
        );

      } else if(this.props.icon){

        return <i className={eventType.classicon}></i>;

      } else if(this.props.label){

        var style = { backgroundColor: eventType.color };
        return <span className="label" style={style} >{_.capitalize(eventType.name)}</span>;

      } else {

        return  <span>{_.capitalize(eventType.name)}</span>;
      }
    }else {
      return <span></span>;
    }
  },

  fillLocalStorage: function(eventTypes) {
    store.set("eventTypes", eventTypes);
  },

  getEventTypes: function() {
    return store.get("eventTypes");
  }

});

module.exports = EventType;
