var React = require("react");

var store = require("./LocalStorage");
var _ = require("lodash");

var Reflux = require("reflux");
var EventTypeStore = require("../../reflux/stores/EventTypeStore");
var EventTypeActions = require("../../reflux/actions/EventTypeActions");


var EventType = React.createClass({

  mixins: [Reflux.connect(EventTypeStore)],

  componentDidMount: function() {
    EventTypeActions.loadEventTypes()
  },

  getInitialState: function() {
    if(_.isEmpty(this.getEventTypes())) {
      this.fillLocalStorage(this.state.eventTypes);
    }

    return {
      eventTypeId: this.props.eventType
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
