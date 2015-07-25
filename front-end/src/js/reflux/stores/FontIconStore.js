var Reflux = require("reflux");
var _ = require("lodash");

var FontIconActions = require("../actions/FontIconActions");

var fontIcons = require('!json!../../../assets/fontello/config.json').glyphs;

var fontIconStore = Reflux.createStore({
  data: {
    fonts: []
  },

  init: function() {
    this.listenToMany(FontIconActions);
  },

  onGetFontIcons: function() {
    var fonts = _.pluck(fontIcons, "css");
    this.data.fonts = fonts;
    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = fontIconStore;
