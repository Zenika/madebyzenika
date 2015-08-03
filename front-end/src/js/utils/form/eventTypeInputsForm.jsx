var React = require("react");
var _ = require("lodash");
var t = require("tcomb-form");

var SelectIcon = require("./customComponents/selectIcon.jsx");

var EventTypeForm = {

  EventTypeForm: t.struct({
    name: t.Str,
    color: t.Str,
    classicon: t.Str
  }),

  EventTypeFields: {
    name: {
      type: "text",
      label: <i>Nom du type d'événement <span className="text-danger">*</span></i>,
      error: <i>Le nom du type d'événement est requis</i>
    },
    color: {
      type: "color",
      label: <i>La couleur du type d'événement <span className="text-danger">*</span></i>,
      error: <i>Le couleur du type d'événement est requis</i>
    },
    classicon: {
      factory: SelectIcon,
      label: <i>L'icône du type d'événement <span className="text-danger">*</span></i>,
      error: <i>L'icône du type d'événement est requis</i>
    }
  },

  getEventTypesAsync: function(data) {
    var EventTypes = [];
    var enumEventTypes = "";

    _.forEach(data, function(value) {
      _(EventTypes).push({ value: value.id, text: _.capitalize(value.name) }).commit();
      enumEventTypes = enumEventTypes + " " + value.id;
    });

    return { optionsType: EventTypes, formType: enumEventTypes};
  }

};

module.exports = EventTypeForm;
