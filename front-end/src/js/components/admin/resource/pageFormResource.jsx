var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var t = require("tcomb-form");
var Form = t.form.Form;

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PageTitle = require("../pageTitle.jsx");

var ResourceInputsForm = require("../../../utils/form/resourceInputsForm.jsx");
var ResourceTypeInputsForm = require("../../../utils/form/resourceTypeInputsForm.jsx");
var EventInputsForm = require("../../../utils/form/eventInputsForm.jsx");

var AddEvent = React.createClass({

  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("ResourceStore", "ResourceTypeStore", "EventStore")],

  getStateFromFlux: function() {
    return {
      options: this.getOptionsForm(),
      type: t.struct(ResourceInputsForm.ResourceInputTypes),
      value: this.getValueForm()
    };
  },

  componentDidMount: function() {
    var flux = this.getFlux();
    flux.actions.ResourceTypeActions.loadResourceTypes();
    flux.actions.EventActions.loadEventsByProject(this.getRouteParamProjectId());

    var resourceId = this.getRouteParamResourceId();
    if (resourceId) { this.getFlux().actions.ResourceActions.loadResourceById(resourceId); }
  },

  getRouteParamProjectId: function() {
    var params = this.context.router.getCurrentParams();
    return params.projectId;
  },

  getRouteParamResourceId: function() {
    var params = this.context.router.getCurrentParams();
    return params.resourceId;
  },

  getValueForm: function() {
    var resource = this.getFlux().store("ResourceStore").resource;
    return (this.getRouteParamResourceId() === resource.id) ? resource : false;
  },

  submit: function () {
    var value = this.refs.form.getValue();
    var routeParamProjectId = this.getRouteParamProjectId();
    var routeParamResourceId = this.getRouteParamResourceId();
    console.log(value);
    if(value) {
      var data = ResourceInputsForm.formatDataProjectResource(value, routeParamProjectId);

      if(routeParamResourceId) {
        console.log(data);

        this.getFlux().actions.ResourceActions.putResource(routeParamResourceId, data).then(function() {
          this.transitionTo("projectDetail", {projectId: routeParamProjectId});
        }.bind(this), function(err) {
          console.log(err);
        });

      } else {

        this.getFlux().actions.ResourceActions.postResource(data).then(function() {
            this.transitionTo("projectDetail", {projectId: routeParamProjectId});
        }.bind(this), function(err) {
            console.log(err);
        });

      }
    }
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.value)) ?  "Ajouter une ressource" : "Modifier la ressource"; }.bind(this);

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title={formTitle()} />
              <Form ref="form" options={this.state.options} type={this.state.type} value={this.state.value} />
              <button className="btn btn-success" onClick={this.submit}>{ formTitle() }</button>
        </div>
      </div>
    );
  },

  getOptionsForm: function() {
    var flux = this.getFlux();

    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: ResourceInputsForm.ResourceFields
    };

    var resourceTypes = ResourceTypeInputsForm.getResourceTypesAsync(flux.store("ResourceTypeStore").resourceTypes);

    var events = EventInputsForm.getEventAsync(flux.store("EventStore").eventsByProject);

    //Update options select resourceType
    _.set(formOptions, "fields.resourceType.options", resourceTypes.optionsType);

    //Update validation for options select resourceType
    _.set(ResourceInputsForm.ResourceInputTypes, "resourceType", t.enums.of(resourceTypes.formType));

    //Update options select events
    _.set(formOptions, "fields.eventId.options", events.optionsType);

    //Update validation for options select events
    _.set(ResourceInputsForm.ResourceInputTypes, "eventId", t.maybe(t.enums.of(events.formType)));

    return formOptions;
  },

  componentWillUnmount: function() {
    this.getFlux().actions.ResourceActions.clearResource();
  }

});

module.exports = AddEvent;
