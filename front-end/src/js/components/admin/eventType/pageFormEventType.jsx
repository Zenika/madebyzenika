var React = require("react");
var Router = require("react-router");
var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var EventTypeStore = require("../../../reflux/stores/EventTypeStore");
var EventTypeActions = require("../../../reflux/actions/EventTypeActions");

var FontIconStore = require("../../../reflux/stores/FontIconStore");
var FontIconActions = require("../../../reflux/actions/FontIconActions");

var EventTypeService = require("../../../utils/ServiceRest/EventTypeService");

var EventTypeInputsForm = require("../../../utils/form/eventTypeInputsForm.jsx");

var PageFormEventType = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(EventTypeStore), Reflux.connect(FontIconStore)],

  getRouteParamEventTypeId: function() {
    var params = this.context.router.getCurrentParams();
    return params.eventTypeId;
  },

  componentDidMount: function() {
    FontIconActions.getFontIcons();
    var eventTypeId = this.getRouteParamEventTypeId();
    if (eventTypeId) { EventTypeActions.loadEventTypeById(eventTypeId); }
  },

  getInitialState: function() {
    return {
      type: EventTypeInputsForm.EventTypeForm
    };
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamEventTypeId = this.getRouteParamEventTypeId();

    if(formData) {
      if(routeParamEventTypeId) {

        EventTypeService.putEventType(routeParamEventTypeId, formData).then(function(res) {
          this.transitionTo("AdminEventTypes");
        }.bind(this), function(err) {
          console.log(err);
        });

      } else {

        EventTypeService.postEventType(formData).then(function(res) {
          this.transitionTo("AdminEventTypes");
        }.bind(this), function(err) {
          console.log(err);
        });

      }

    }
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.eventType)) ? "Ajouter un type d'événement" : "Modifier le type d'événement"; }.bind(this);

   return (
     <div id="page-wrapper">
       <div id="wrapper">
         <PageTitle title={formTitle()} />

              <Form ref="form" options={this.getOptionsForm()} type={this.state.type} value={this.state.eventType} />
              <button className="btn btn-success" onClick={this.onClick}>{ formTitle() }</button>
        </div>
      </div>
    );
  },

  getOptionsForm: function() {
    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: EventTypeInputsForm.EventTypeFields
    };

    _.set(formOptions, "fields.classicon.options", this.state.fonts);

    return formOptions;
  },
});

module.exports = PageFormEventType;
