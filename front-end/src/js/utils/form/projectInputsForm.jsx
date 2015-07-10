var React = require("react");
var t = require("tcomb-form");

var Validation = require("./validationRulesForm");
var MultiSelect = require("./customComponents/multiSelectTags.jsx");

var ProjectForm = {

  ProjectInputTypes: {
    name: Validation.MinMax(3, 60),
    description: Validation.MinMax(20, 400),
    agency: t.enums({Paris: "Paris", Nantes: "Nantes", Rennes: "Rennes", Lyon: "Lyon", Lille: "Lille"}),
    projectType: t.enums.of(""),
    technologies: t.maybe(t.list(t.Str))
  },

  ProjectFields: {
    name: {
      type: "text",
      label: <i>Nom du projet</i>,
      error: <i>Le nom du projet doit avoir entre 3 et 20 caractères</i>
    },
    description: {
      type: "textarea",
      label: <i>Description du projet</i>,
      error: <i>La description du projet doit avoir entre 20 et 400 caractères</i>
    },
    agency: {
      label: <i>Agence</i>,
      error: <i>Veuillez renseigner une agence</i>
    },
    projectType: {
      label: <i>Type de projet</i>,
      error: <i>Veuillez renseigner le type du projet</i>
    },
    technologies: {
      factory: MultiSelect,
      label: <i>Stacks technique</i>,
      error: <i>Veuillez renseigner au moins une stack technique</i>
    }
  }
};

module.exports = ProjectForm;
