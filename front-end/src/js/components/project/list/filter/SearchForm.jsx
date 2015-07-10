var React = require("react/addons");
var BootStrap = require("react-bootstrap");
var Input = BootStrap.Input;

var SearchForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
      return {
        searchFullText: null
      };
  },

  changeSearchFullText: function(newValue) {
    this.props.searchHandler(newValue);
  },

  render: function() {
    var filterFullText = {
      value: this.state.searchFullText,
      requestChange: this.changeSearchFullText
  };

  return (
      <Input type="text" valueLink={filterFullText} placeholder="Rechercher un projet"/>
  );

  }
});

module.exports = SearchForm;
