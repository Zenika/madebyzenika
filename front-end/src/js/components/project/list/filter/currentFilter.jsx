var React = require("react");
var Fluxxor = require("fluxxor");
var _ = require("lodash");
var ProjectType = require("../../../../utils/LocalStorage/ProjectType.jsx");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var currentFilter = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("ProjectStore", "TechnologyStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();

    var userFilter = flux.store("ProjectStore").filter;

    return {
      userFilter: userFilter
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ userFilter: nextProps.userFilter});
  },

  removeFilterType: function(type) {
      console.log(type);
  },

  tagTypeFilter: function(type) {
    return (
      <span className="tag label label-default">
        <ProjectType projectType={type} />
        <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"
              onClick={this.removeFilterType.bind(this, type)}></i></a>
      </span>
    );
  },

  tagTechnologiesFilter: function(technology) {
    return (
      <span className="tag label label-default">
        <span>{_.capitalize(technology)}</span>
        <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
      </span>
    );
  },

  render: function() {
    var technologyName = this.getFlux().store("TechnologyStore").getTechnologyById(this.state.userFilter.technologies);
    var type = this.state.userFilter.type;
      return (
        <div className="current-filter">
          <div className="container">
              <b><i className="fa fa-filter"></i> filtres actifs : </b>
              { type ? this.tagTypeFilter(type) : null }
              { technologyName ? this.tagTechnologiesFilter(technologyName) : null }
          </div>
        </div>
      );
  }

});

module.exports = currentFilter;
