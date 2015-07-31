var React = require("react");
var _ = require("lodash");
var Reflux = require("reflux");

var TechnologyStore = require("../../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../../reflux/actions/TechnologyActions");

var FilterStore = require("../../../../reflux/stores/FilterStore");
var FilterActions = require("../../../../reflux/actions/FilterActions");

var ProjectType = require("../../../../utils/LocalStorage/ProjectType.jsx");


var currentFilter = React.createClass({

  mixins: [Reflux.connect(TechnologyStore)],

  getInitialState: function() {
    return {
      filter: this.props.filter
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ filter: nextProps.filter});
  },

  removeFilterTechnologies: function() {
    FilterActions.getFilter(FilterStore.data.filter.type, "all");
  },

  removeFilterType: function() {
    FilterActions.getFilter("all", FilterStore.data.filter.technologies);
  },

  tagTypeFilter: function(type) {
    console.log(type);
    return (
      <span className="tag label label-default">
        <ProjectType projectType={type} />
        <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"
              onClick={this.removeFilterType}></i></a>
      </span>
    );
  },

  tagTechnologiesFilter: function(technologies) {
    var technologyName = _.pluck(_.filter(this.state.technologies, { "id": technologies}), "name");
    return (
      <span className="tag label label-default">
        <span>{_.capitalize(technologyName)}</span>
        <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"
              onClick={this.removeFilterTechnologies}></i></a>
      </span>
    );
  },

  render: function() {
    var type = this.state.filter.type;
    var technologies = this.state.filter.technologies;

      return (
        <div className="current-filter">
          <div className="container">
              <b><i className="fa fa-filter"></i> filtres actifs : </b>
              { (type != "all") ? this.tagTypeFilter(type) : <span className="tag label label-default">Tous les types</span> }
              { (technologies != "all") ? this.tagTechnologiesFilter(technologies) : <span className="tag label label-default">Toutes les technologies</span> }
          </div>
        </div>
      );
  }

});

module.exports = currentFilter;
