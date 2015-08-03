var t = require("tcomb-form");

var Validation = {

  MinMax: function(min, max) {
    return t.subtype(t.Str, function (n) {
      return n.length >= min && n.length <= max;
    });
  },

  isAnUrl: function() {
      return t.subtype(t.Str, function (n) {
        var urlPattern = "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?";
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
