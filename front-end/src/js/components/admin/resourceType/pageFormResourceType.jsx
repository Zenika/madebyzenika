var React = require("react");
var Router = require("react-router");
var Bootstrap = require("react-bootstrap");
var Alert = Bootstrap.Alert;

var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var ResourceTypeStore = require("../../../reflux/stores/ResourceTypeStore");
var ResourceTypeActions = require("../../../reflux/actions/ResourceTypeActions");

var FontIconStore = require("../../../reflux/stores/FontIconStore");
var FontIconActions = require("../../../reflux/actions/FontIconActions");

var NotificationStore = require("../../../reflux/stores/NotificationStore");
var NotificationActions = require("../../../reflux/actions/NotificationActions");

var ResourceTypeService = require("../../../utils/ServiceRest/ResourceTypeService");

var ResourceTypeInputsForm = require("../../../utils/form/resourceTypeInputsForm.jsx");

var PageFormResourceType = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(ResourceTypeStore), Reflux.connect(FontIconStore), Reflux.connect(NotificationStore)],

  componentDidMount: function() {
    FontIconActions.getFontIcons();
    var resourceTypeId = this.getRouteParamResourceTypeId();
    if (resourceTypeId) { ResourceTypeActions.loadResourceTypeById(resourceTypeId); }
  },

  getRouteParamResourceTypeId: function() {
    var params = this.context.router.getCurrentParams();
    return params.resourceTypeId;
  },

  getInitialState: function() {
    return {
      type: ResourceTypeInputsForm.ResourceTypeForm
    };
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamResourceTypeId = this.getRouteParamResourceTypeId();

    if(formData) {
      if(routeParamResourceTypeId) {
        ResourceTypeService.getResourceTypesByName(formData.name).then(function(res) {
          var resourceTypes = _.reject(res.body, { "name": formData.name });

            if (resourceTypes.length > 0) {
              this.handleAlertShow();
            } else {
              ResourceTypeService.putResourceType(routeParamResourceTypeId, formData).then(function(res) {
                NotificationActions.setNotification("Le type de ressource a bien été mis à jour", "success");
                this.transitionTo("AdminResourceTypes");
              }.bind(this), function(err) {
                console.log(err);
              });
            }

          }.bind(this), function(err) {
            console.log(err);
          });
      } else {
        ResourceTypeService.getResourceTypesByName(formData.name).then(function(res) {
          console.log(res);
            if (res.body.length > 0) {
              this.handleAlertShow();
            } else {

              ResourceTypeService.postResourceType(formData).then(function(res) {
                NotificationActions.setNotification("Le type de ressource a bien été ajouté", "success");
                this.transitionTo("AdminResourceTypes");
              }.bind(this), function(err) {
                console.log(err);
              });

            }
        }.bind(this), function(err) {
          console.log(err);
        });
      }
    }
  },

  resourceTypeAlreadyExist: function() {
    return (
      <Alert bsStyle='warning' onDismiss={this.handleAlertDismiss} dismissAfter={5000}>
        <h4>Oups :-(! </h4>
        <p>Impossible d'ajouter le type de ressource, celui-ci est déjà présent sur le site.</p>
      </Alert>
    )
  },

  handleAlertDismiss: function() {
    this.setState({ alertVisible: false });
  },

  handleAlertShow: function() {
    this.setState({ alertVisible: true });
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.resourceType)) ? "Ajouter un type de ressource" : "Modifier le type de ressource"; }.bind(this);
    var warning = function() { return (this.state.alertVisible) ? this.resourceTypeAlreadyExist() : null; }.bind(this);

   return (
     <div id="page-wrapper">
       <div id="wrapper">
         <PageTitle title={formTitle()} />
            {warning()}
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

    _.set(formOptions, "fields.classicon.options", this.state.fonts);

    return formOptions;
  },
});

module.exports = PageFormResourceType;
