var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var t = require("tcomb-form");
var Form = t.form.Form;

var Reflux = require("reflux");

var ResourceStore = require("../../../reflux/stores/ResourceStore");
var ResourceActions = require("../../../reflux/actions/ResourceActions");

var ResourceTypeStore = require("../../../reflux/stores/ResourceTypeStore");
var ResourceTypeActions = require("../../../reflux/actions/ResourceTypeActions");

var EventStore = require("../../../reflux/stores/EventStore");
var EventActions = require("../../../reflux/actions/EventActions");

var ResourceService = require("../../../utils/ServiceRest/ResourceService");

var PageTitle = require("../pageTitle.jsx");

var ResourceInputsForm = require("../../../utils/form/resourceInputsForm.jsx");
var ResourceTypeInputsForm = require("../../../utils/form/resourceTypeInputsForm.jsx");
var EventInputsForm = require("../../../utils/form/eventInputsForm.jsx");

var AddEvent = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ResourceStore), Reflux.connect(ResourceTypeStore), Reflux.connect(EventStore)],

  getInitialState: function() {
    return {
      type: t.struct(ResourceInputsForm.ResourceInputTypes)
    };
  },

  componentDidMount: function() {
    ResourceTypeActions.loadResourceTypes();
    EventActions.loadEventsByProject(this.getRouteParamProjectId());

    var resourceId = this.getRouteParamResourceId();
    if (resourceId) { ResourceActions.loadResourceById(resourceId); }
  },

  getRouteParamProjectId: function() {
    var params = this.context.router.getCurrentParams();
    return params.projectId;
  },

  getRouteParamResourceId: function() {
    var params = this.context.router.getCurrentParams();
    return params.resourceId;
  },

  submit: function () {
    var value = this.refs.form.getValue();
    var routeParamProjectId = this.getRouteParamProjectId();
    var routeParamResourceId = this.getRouteParamResourceId();

    if(value) {
      var data = ResourceInputsForm.formatDataProjectResource(value, routeParamProjectId);

      if(routeParamResourceId) {
        ResourceService.putResource(routeParamResourceId, data).then(function(res) {
          this.transitionTo("projectDetail", {projectId: routeParamProjectId});
        }.bind(this), function(err) {
          console.log(err);
        });

      } else {

        ResourceService.postResource(data).then(function(data) {
          this.transitionTo("projectDetail", {projectId: routeParamProjectId});
        }.bind(this), function(err) {
          console.log(err);
          reject({error: err});
        });
      }
    }
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.resource)) ?  "Ajouter une ressource" : "Modifier la ressource"; }.bind(this);

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title={formTitle()} />
              <Form ref="form" options={this.getOptionsForm()} type={this.state.type} value={this.state.resource} />
              <button className="btn btn-success" onClick={this.submit}>{ formTitle() }</button>
        </div>
      </div>
    );
  },

  getOptionsForm: function() {
    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: ResourceInputsForm.ResourceFields
    };

    var resourceTypes = ResourceTypeInputsForm.getResourceTypesAsync(this.state.resourceTypes);

    var events = EventInputsForm.getEventAsync(this.state.eventsByProject);
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
    ResourceActions.clearResource();
  }

});

module.exports = AddEvent;
