var React = require("react");
var Router = require("react-router");
var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var ResourceTypeStore = require("../../../reflux/stores/ResourceTypeStore");
var ResourceTypeActions = require("../../../reflux/actions/ResourceTypeActions");

var ResourceTypeService = require("../../../utils/ServiceRest/ResourceTypeService");

var ResourceTypeInputsForm = require("../../../utils/form/resourceTypeInputsForm.jsx");

var PageFormResourceType = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ResourceTypeStore)],

  getRouteParamResourceTypeId: function() {
    var params = this.context.router.getCurrentParams();
    return params.resourceTypeId;
  },

  getInitialState: function() {
    return {
      type: ResourceTypeInputsForm.ResourceTypeForm
    };
  },

  componentDidMount: function() {
    var resourceTypeId = this.getRouteParamResourceTypeId();
    if (resourceTypeId) { ResourceTypeActions.loadResourceTypeById(resourceTypeId); }
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamResourceTypeId = this.getRouteParamResourceTypeId();

    if(formData) {
      if(routeParamResourceTypeId) {

        ResourceTypeService.putResourceType(routeParamResourceTypeId, formData).then(function(res) {
          this.transitionTo("PageAdminResourceTypes");
        }.bind(this), function(err) {
          console.log(err);
        });

      } else {

        ResourceTypeService.postResourceType(formData).then(function(res) {
          this.transitionTo("PageAdminResourceTypes");
        }.bind(this), function(err) {
          console.log(err);
        });

      }

    }
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.resourceType)) ? "Ajouter un type de ressource" : "Modifier le type de ressource"; }.bind(this);

   return (
     <div id="page-wrapper">
       <div id="wrapper">
         <PageTitle title={formTitle()} />

              <Form ref="form" options={this.getOptionsForm()} type={this.state.type} value={this.state.resourceType} />
              <button className="btn btn-success" onClick={this.onClick}>{ formTitle() }</button>
        </div>
      </div>
    );
  },

  getOptionsForm: function() {
    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: ResourceTypeInputsForm.ResourceTypeFields
    };

    return formOptions;
  },
});

module.exports = PageFormResourceType;
