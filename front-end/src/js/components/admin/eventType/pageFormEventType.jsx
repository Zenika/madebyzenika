var React = require("react");
var Fluxxor = require("fluxxor");
var _ = require("lodash");

var PageFormEventType = React.createClass({

  render: function() {
    return <h1>Page form eventType</h1>
  }

});

module.exports = PageFormEventType;

var React = require("react");
var Router = require("react-router");
var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var EventTypeStore = require("../../../reflux/stores/EventTypeStore");
var EventTypeActions = require("../../../reflux/actions/EventTypeActions");

var EventTypeService = require("../../../utils/ServiceRest/EventTypeService");

var EventTypeInputsForm = require("../../../utils/form/eventTypeInputsForm.jsx");

var PageFormEventType = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(EventTypeStore)],

  getRouteParamEventTypeId: function() {
    var params = this.context.router.getCurrentParams();
    return params.eventTypeId;
  },

  getInitialState: function() {
    return {
      type: EventTypeInputsForm.EventTypeForm
    };
  },

  componentDidMount: function() {
    var eventTypeId = this.getRouteParamEventTypeId();
    if (eventTypeId) { EventTypeActions.loadEventTypeById(eventTypeId); }
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamEventTypeId = this.getRouteParamEventTypeId();

    if(formData) {
      if(routeParamEventTypeId) {

        EventTypeService.putEventType(routeParamEventTypeId, formData).then(function(res) {
          this.transitionTo("PageAdminEventTypes");
        }.bind(this), function(err) {
          console.log(err);
        });

      } else {

        EventTypeService.postEventType(formData).then(function(res) {
          this.transitionTo("PageAdminEventTypes");
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

    return formOptions;
  },
});

module.exports = PageFormEventType;
