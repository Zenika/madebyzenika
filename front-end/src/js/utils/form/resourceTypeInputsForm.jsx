var React = require("react");
var _ = require("lodash");
var t = require("tcomb-form");

var SelectIcon = require("./customComponents/selectIcon.jsx");

var ResourceTypeForm = {

  ResourceTypeForm: t.struct({
    name: t.Str,
    color: t.Str,
    classicon: t.Str
  }),

  ResourceTypeFields: {
    name: {
      type: "text",
      label: <i>Nom du type de ressource</i>,
      error: <i>Le nom du type de ressource est requis</i>
    },
    color: {
      type: "color",
      label: <i>La couleur du type de ressource</i>,
      error: <i>Le couleur du type de ressource est requis</i>
    },
    classicon: {
      factory: SelectIcon,
      label: <i>L'icône du type de ressource</i>,
      error: <i>L'icône du type de ressource est requis</i>
    }
  },

  getResourceTypesAsync: function(data) {
    var resourceTypes = [];
    var enumResourceTypes = "";

    _.forEach(data, function(value) {
      _(resourceTypes).push({ value: value.id, text: _.capitalize(value.name) }).commit();
      enumResourceTypes = enumResourceTypes + " " + value.id;
    });

    return { optionsType: resourceTypes, formType: enumResourceTypes};
  }

};

module.exports = ResourceTypeForm;
