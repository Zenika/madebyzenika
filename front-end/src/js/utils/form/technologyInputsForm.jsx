var React = require("react");
var t = require("tcomb-form");
var _ = require("lodash");

var TechnologyForm = {

  TechnologyForm: t.struct({
    name: t.Str
  }),

  TechnologyFields: {
    name: {
      type: "text",
      label: <i>Nom de la technologie <span className="text-danger">*</span></i>,
      error: <i>Le nom de la technologie est requis</i>
    }
  },

  arrayOfTagsTechnologies: t.subtype(t.list(t.Str), function (list) {
    var validate = true;
      _.forEach(list, function(value) {
        if(_.indexOf(this.techno, value) <= -1){
          validate = validate && false;
        }
      }.bind(this));
    return validate;
  }),

  getTechnologiesAsync: function(data) {
    var technologies = [];

    _.forEach(data, function(value) {
      _(technologies).push({ value: value.id, label: _.capitalize(value.name) }).commit();
    });

    return technologies;
  }
};

module.exports = TechnologyForm;
