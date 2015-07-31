var React = require("react");
var Router = require("react-router");
var t = require("tcomb-form");
var Form = t.form.Form;
var _ = require("lodash");

var PageTitle = require("../pageTitle.jsx");

var Reflux = require("reflux");

var TechnologyStore = require("../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../reflux/actions/TechnologyActions");

var TechnologyService = require("../../../utils/ServiceRest/TechnologyService");

var TechnologyInputsForm = require("../../../utils/form/technologyInputsForm.jsx");

var formTechnology = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(TechnologyStore)],

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
        TechnologyService.postTechnology(formData).then(function(res) {
          this.props.technoAdded();
        }.bind(this), function(err) {
          console.log(err);
        });

      }

    }
  },

  render: function () {
    var formTitle = function() { return (_.isEmpty(this.state.technology)) ? "Ajouter une technologie" : "Modifier une technologie"; }.bind(this);

   return (
     <div>
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
