var React = require("react");
var Router = require("react-router");
var Bootstrap = require("react-bootstrap");
var Alert = Bootstrap.Alert;
var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var TechnologyStore = require("../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../reflux/actions/TechnologyActions");

var NotificationStore = require("../../../reflux/stores/NotificationStore");
var NotificationActions = require("../../../reflux/actions/NotificationActions");

var TechnologyService = require("../../../utils/ServiceRest/TechnologyService");

var TechnologyInputsForm = require("../../../utils/form/technologyInputsForm.jsx");

var formTechnology = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(TechnologyStore), Reflux.connect(NotificationStore)],

  componentDidMount: function() {
    var technologyId = this.getRouteParamTechnologyId();
    if (technologyId) { TechnologyActions.loadTechnologyById(technologyId); }
  },

  getRouteParamTechnologyId: function() {
    var params = this.context.router.getCurrentParams();
    return params.technologyId;
  },

  getInitialState: function() {
    return {
      type: TechnologyInputsForm.TechnologyForm
    };
  },

  onClick: function () {
    var formData = this.refs.form.getValue();
    var routeParamTechnologyId = this.getRouteParamTechnologyId();

    if(formData) {
      if(routeParamTechnologyId) {

        // TechnologyService.putTechnology(routeParamTechnologyId, formData).then(function(res) {
        //   this.transitionTo("PageAdminTechnologies");
        // }.bind(this), function(err) {
        //   console.log(err);
        // });

      } else {
        TechnologyService.getTechnologiesByName(formData.name).then(function(res) {
          if (res.body.length > 0) {
            this.handleAlertShow();
          } else {
            TechnologyService.postTechnology(formData).then(function(res) {
              NotificationActions.setNotification("La technologie a bien été ajouté", "success");
              this.props.technoAdded();
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

  technoAlreadyExist: function() {
    return (
      <Alert bsStyle='warning' onDismiss={this.handleAlertDismiss} dismissAfter={5000}>
        <h4>Oups :-(! </h4>
        <p>Impossible d'ajouter la technologie, celle-ci est déjà présente sur le site.</p>
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
    var formTitle = function() { return (_.isEmpty(this.state.technology)) ? "Ajouter une technologie" : "Modifier une technologie"; }.bind(this);
    var warning = function() { return (this.state.alertVisible) ? this.technoAlreadyExist() : null; }.bind(this);

   return (
     <div>
      {warning()}
      <Form ref="form" options={this.getOptionsForm()} type={this.state.type} value={this.state.technology} />
      <button className="btn btn-success" onClick={this.onClick}>{ formTitle() }</button>
    </div>
    );
  },

  getOptionsForm: function() {
    var formOptions = {
      auto: "placeholders",
      hasError: true,
      fields: TechnologyInputsForm.TechnologyFields
    };
    return formOptions;
  }

});

module.exports = formTechnology;
