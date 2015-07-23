var React = require("react");
var _ = require("lodash");
var Reflux = require("reflux");

var TechnologyStore = require("../../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../../reflux/actions/TechnologyActions");

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

  removeFilterType: function(type) {
      //console.log(type);
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

  tagTechnologiesFilter: function(technologies) {
    var technologyName = _.pluck(_.filter(this.state.technologies, { "id": technologies}), "name");
    return (
      <span className="tag label label-default">
        <span>{_.capitalize(technologyName)}</span>
        <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
      </span>
    );
  },

  render: function() {
    var type = this.state.filter.type;
    var technologies = this.state.filter.technologies;
    console.log(this.state);
      return (
        <div className="current-filter">
          <div className="container">
              <b><i className="fa fa-filter"></i> filtres actifs : </b>
              { (type != "all") ? this.tagTypeFilter(type) : null }
              { (technologies != "all") ? this.tagTechnologiesFilter(technologies) : null }
          </div>
        </div>
      );
  }

});

module.exports = currentFilter;
