var React = require("react");
var _ = require("lodash");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var tagTechnologiesByProject = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TechnologyStore", "ProjectStore")],

  componentDidMount: function() {
    this.getFlux().actions.TechnologyActions.loadTechnologiesByProjectId(this.props.projectId);
  },

  filterTechnology: function(technology) {
    var flux = this.getFlux().store("ProjectStore");

    if(technology === "all") {
      flux.filter.technology = null;
      this.getFlux().actions.ProjectActions.getProjectsFilter();
      this.setState({ projects: flux.projectsFilter });
    } else {
      flux.filter.technology = technology;
      this.getFlux().actions.ProjectActions.getProjectsFilter();
      this.setState({ projects: flux.projectsFilter });
    }
  },

  getStateFromFlux: function() {
    var flux = this.getFlux().store("TechnologyStore");

    return {
      tags: _.result(_.find(flux.technologiesByProject, { "projectId": this.props.projectId }), "technologies")
    };
  },

  render: function() {
    return (
      <div>
        <i className="glyphicon glyphicon-tags"></i>
        {_.map(this.state.tags, function(technology) {
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
