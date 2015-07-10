var React = require("react");
var Router = require("react-router");
var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EventInputsForm = require("../../../utils/form/eventInputsForm.jsx");
var EventTypeInputsForm = require("../../../utils/form/eventTypeInputsForm.jsx");

var AddEvent = React.createClass({

  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("EventStore","EventTypeStore")],

  getRouteParamEventId: function() {
    var params = this.context.router.getCurrentParams();
    return params.eventId;
  },

  getRouteParamProjectId: function() {
    var params = this.context.router.getCurrentParams();
    return params.projectId;
  },

  getValueForm: function() {
    var projectEvent = this.getFlux().store("EventStore").projectEvent;
    return (this.getRouteParamEventId() === projectEvent.id) ? EventInputsForm.formatData(projectEvent) : false;
  },

  getStateFromFlux: function() {
    return {
      options: this.getOptionsForm(),
      type: t.struct(EventInputsForm.EventInputTypes),
      value: this.getValueForm()
    };
  },

  componentDidMount: function() {
    this.getFlux().actions.EventTypeActions.loadEventTypes();
    var eventId = this.getRouteParamEventId();
    if (eventId) { this.getFlux().actions.EventActions.loadEvent(eventId); }
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamProjectId = this.getRouteParamProjectId();

    if(formData) {
      if(routeParamProjectId) {
        var data = EventInputsForm.formatData(formData, routeParamProjectId);
        console.log(data);

        this.getFlux().actions.EventActions.postEvent(data).then(function() {
            this.transitionTo("projectDetail", {projectId: routeParamProjectId});
        }.bind(this), function(err) {
            console.log(err);
        });

      } else {

        var projectId = this.state.value.projectId;
        var newEvent = EventInputsForm.formatData(formData, projectId);

        this.getFlux().actions.EventActions.putEvent(this.getRouteParamEventId(), newEvent).then(function() {
            this.transitionTo("projectDetail", {projectId: projectId});
        }.bind(this), function(err) {
            console.log(err);
        });

      }

    }
  },

  render: function () {
    console.log(this.state.value);
    var formTitle = function() { return (_.isEmpty(this.state.value)) ? "Ajouter un événement" : "Modifier l'évenement"; }.bind(this);

   return (
     <div id="page-wrapper">
       <div id="wrapper">
         <PageTitle title={formTitle()} />

              <Form ref="form" options={this.state.options} type={this.state.type} value={this.state.value} />
              <button className="btn btn-success" onClick={this.onClick}>{ formTitle() }</button>
        </div>
      </div>
    );
  },

  getOptionsForm: function() {
    var flux = this.getFlux();

    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: EventInputsForm.EventFields
    };

    var eventTypes = EventTypeInputsForm.getEventTypesAsync(flux.store("EventTypeStore").eventTypes);

    //Update options select eventType
    _.set(formOptions, "fields.eventType.options", eventTypes.optionsType);

    //Update validation for options select eventType
    _.set(EventInputsForm.EventInputTypes, "eventType", t.enums.of(eventTypes.formType));

    return formOptions;
  },
});

module.exports = AddEvent;
