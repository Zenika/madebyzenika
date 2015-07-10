var React = require("react");
var _ = require("lodash");
var t = require("tcomb-form");

var Validation = require("./validationRulesForm");
var DateTimeField = require("./customComponents/dateTimeField.jsx");

var EventForm = {

  EventInputTypes: {
    name: Validation.MinMax(3, 60),
    description: Validation.MinMax(20, 400),
    eventType: t.enums.of(""),
    dateStart: Validation.isADateObject(),
    dateEnd: t.maybe(Validation.isADateObject())
  },

  EventFields: {
    name: {
      type: "text",
      label: <i>Nom de l'événement</i>,
      error: <i>Le nom de l'événement doit avoir entre 3 et 20 caractères</i>
    },
    description: {
      type: "textarea",
      label: <i>Description de l'événement</i>,
      error: <i>La description de l'événement doit avoir entre 20 et 400 caractères</i>
    },
    eventType: {
      label: <i>Type d'événement</i>,
      error: <i>Veuillez renseigner le type d'événement</i>
    },
    dateStart: {
      factory: DateTimeField,
      label: <i>Date du début de l'événement</i>,
      error: <i>Date du début de l'événement requis</i>
    },
    dateEnd: {
      factory: DateTimeField,
      label: <i>Date de fin de l'événement</i>
    }
  },

  formatData: function(data, projectId) {
    var Event = {};

    if(projectId) {

      _.forEach(data, function(value, key) {
        if((key === "dateStart" && value) || (key === "dateEnd" && value)){
          Event[key] = value.getTime();
        } else {
          Event[key] = value;
        }
      });
      Event.projectId = projectId;

    } else {

      _.forEach(data, function(value, key) {
        if((key === "dateStart" && value) || (key === "dateEnd" && value)){
          Event[key] = new Date(value);
        } else {
          Event[key] = value;
        }
      });

    }

    return Event;
  },

  getEventAsync: function(data) {
    var events = [];
    var enumEvents = "";

    _.forEach(data, function(value) {
      _(events).push({ value: value.id, text: _.capitalize(value.name) }).commit();
      enumEvents = enumEvents + " " + value.id;
    });

    return { optionsType: events, formType: enumEvents};
  }

};

module.exports = EventForm;
