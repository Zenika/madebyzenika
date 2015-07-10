var React = require("react");
var t = require("tcomb-form");

var Validation = require("./validationRulesForm");

var ResourceForm = {

  ResourceInputTypes: {
    name: Validation.MinMax(3, 80),
    link: Validation.isAnUrl(),
    resourceType: t.enums.of(""),
    eventId: t.maybe(t.enums.of(""))
  },

  ResourceFields: {
    name: {
      type: "text",
      label: <i>Nom de la ressource</i>,
      error: <i>Le nom de la ressource doit avoir entre 3 et 80 caractères</i>
    },
    link: {
      type: "text",
      label: <i>Lien de la ressource</i>,
      error: <i>Le lien de la ressource doit être une URL valide</i>
    },
    resourceType: {
      label: <i>Type de la ressource</i>,
      error: <i>Veuillez renseigner le type de la ressource</i>
    },
    eventId: {
      label: <i>Associer la ressource à un événement</i>,
      error: <i>L'événement associé n'est pas valable</i>
    }
  },

  formatDataProjectResource: function(data, projectId) {
    var Resource = {};

    _.forEach(data, function(value, key) {
        Resource[key] = value;
    });
    Resource.projectId = projectId;
    Resource.lastModified = Date.now();
    return Resource;
  }
};

module.exports = ResourceForm;
