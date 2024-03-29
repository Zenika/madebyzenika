var React = require("react");

var Router = require("react-router");

var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var EventStore = require("../../../reflux/stores/EventStore");
var EventActions = require("../../../reflux/actions/EventActions");

var EventTypeStore = require("../../../reflux/stores/EventTypeStore");
var EventTypeActions = require("../../../reflux/actions/EventTypeActions");

var NotificationStore = require("../../../reflux/stores/NotificationStore");
var NotificationActions = require("../../../reflux/actions/NotificationActions");

var EventService = require("../../../utils/ServiceRest/EventService");

var EventInputsForm = require("../../../utils/form/eventInputsForm.jsx");
var EventTypeInputsForm = require("../../../utils/form/eventTypeInputsForm.jsx");

var pageFormEvent = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(EventStore), Reflux.connect(EventTypeStore), Reflux.connect(NotificationStore)],

  getRouteParamEventId: function() {
    var params = this.context.router.getCurrentParams();
    return params.eventId;
  },

  getRouteParamProjectId: function() {
    var params = this.context.router.getCurrentParams();
    return params.projectId;
  },

  getInitialState: function() {
    return {
      type: t.struct(EventInputsForm.EventInputTypes)
    };
  },

  componentDidMount: function() {
    EventTypeActions.loadEventTypes();
    var eventId = this.getRouteParamEventId();
    if (eventId) { EventActions.loadEvent(eventId); }
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamProjectId = this.getRouteParamProjectId();
    var routeParamEventId = this.getRouteParamEventId();

    if(formData) {
      if(routeParamEventId) {
        var projectId = this.state.event.projectId;
        var newEvent = EventInputsForm.formatData(formData, projectId);

        EventService.putEvent(this.getRouteParamEventId(), newEvent).then(function(res) {
          NotificationActions.setNotification("L'événement a bien été mis à jour", "success");
          this.transitionTo("projectDetail", {projectId: projectId});
        }.bind(this), function(err) {
          console.log(err);
        });

      } else {

        var data = EventInputsForm.formatData(formData, routeParamProjectId);

        EventService.postEvent(data).then(function(res) {
          NotificationActions.setNotification("L'événement a bien été ajouté", "success");
          this.transitionTo("projectDetail", {projectId: routeParamProjectId});
        }.bind(this), function(err) {
          console.log(err);
        });

      }
    }
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.event)) ? "Ajouter un événement" : "Modifier l'évenement"; }.bind(this);

   return (
       <div>
         <PageTitle title={formTitle()} />

              <Form ref="form" options={this.getOptionsForm()} type={this.state.type} value={EventInputsForm.formatData(this.state.event)} />
              <button className="btn btn-success" onClick={this.onClick}>{ formTitle() }</button>
        </div>
    );
  },

  getOptionsForm: function() {
    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: EventInputsForm.EventFields
    };

    var eventTypes = EventTypeInputsForm.getEventTypesAsync(this.state.eventTypes);

    //Update options select eventType
    _.set(formOptions, "fields.eventType.options", eventTypes.optionsType);

    //Update validation for options select eventType
    _.set(EventInputsForm.EventInputTypes, "eventType", t.enums.of(eventTypes.formType));

    return formOptions;
  },

  componentWillUnmount: function() {
    EventActions.clearEvent();
  }
});

module.exports = pageFormEvent;
