var React = require("react");
var _ = require("lodash");
var t = require("tcomb-form");

var ProjectTypeForm = {

  ProjectTypeForm: t.struct({
    name: t.Str
  }),

  ProjectTypeFields: {
    name: {
      type: "text",
      label: <i>Nom du type de projet <span className="text-danger">*</span></i>,
      error: <i>A custom error message</i>
    }
  },

  getProjectTypesAsync: function(data) {
    var projectTypes = [];
    var enumProjectTypes = "";

    _.forEach(data, function(value) {
      _(projectTypes).push({ value: value.id, text: _.capitalize(value.name) }).commit();
      enumProjectTypes = enumProjectTypes + " " + value.id;
    });

    return { optionsType: projectTypes, formType: enumProjectTypes};
  }

};

module.exports = ProjectTypeForm;
