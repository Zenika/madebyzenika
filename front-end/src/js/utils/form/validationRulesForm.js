var t = require("tcomb-form");

var Validation = {

  MinMax: function(min, max) {
    return t.subtype(t.Str, function (n) {
      return n.length >= min && n.length <= max;
    });
  },

  isAnUrl: function() {
      return t.subtype(t.Str, function (n) {
        var urlPattern = "(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?";
        return (n.match(urlPattern)) ? true : false;
      });
  },

  isADateObject: function() {
    return t.subtype(t.Obj, function (d) {
      return d instanceof Date;
    });
  }
};

module.exports = Validation;
