var React = require("react");
var _ = require("lodash");

var Reflux = require("reflux");
var TechnologyStore = require("../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../reflux/actions/TechnologyActions");

var FilterStore = require("../../reflux/stores/FilterStore");
var FilterActions = require("../../reflux/actions/FilterActions");

var tagTechnologiesByProject = React.createClass({
  mixins: [Reflux.connect(TechnologyStore)],

  componentDidMount: function() {
    TechnologyActions.loadTechnologiesByProjectId(this.props.projectId)
  },

  filterTechnology: function(technology) {
    FilterActions.getFilter(FilterStore.data.filter.type, technology);
  },

  render: function() {
    var currentProjectId = this.props.projectId;
    return (
      <div>
        {_.map(this.state.technologiesByProject[currentProjectId], function(technology) {
          return (
            <span className="label label-default" key={technology.id} onClick={this.filterTechnology.bind(this, technology.id)}>
                {technology.name}
            </span>
          );
        }.bind(this))}
      </div>
    );
  }

});

module.exports = tagTechnologiesByProject;
