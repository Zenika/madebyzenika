var React = require("react");
var _ = require("lodash");

var Reflux = require("reflux");
var TechnologyStore = require("../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../reflux/actions/TechnologyActions");

// var Fluxxor = require("fluxxor");
// var FluxMixin = Fluxxor.FluxMixin(React);
// var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var tagTechnologiesByProject = React.createClass({
  mixins: [Reflux.connect(TechnologyStore)],

  componentDidMount: function() {
    TechnologyActions.loadTechnologiesByProjectId(this.props.projectId)
    //this.getFlux().actions.TechnologyActions.loadTechnologiesByProjectId(this.props.projectId);
  },

  filterTechnology: function(technology) {
    //var flux = this.getFlux().store("ProjectStore");

    // if(technology === "all") {
    //   flux.filter.technology = null;
    //   this.getFlux().actions.ProjectActions.getProjectsFilter();
    //   this.setState({ projects: flux.projectsFilter });
    // } else {
    //   flux.filter.technology = technology;
    //   this.getFlux().actions.ProjectActions.getProjectsFilter();
    //   this.setState({ projects: flux.projectsFilter });
    // }
  },

  getStateFromFlux: function() {
    // var flux = this.getFlux().store("TechnologyStore");
    //
    // return {
    //   tags: _.result(_.find(flux.technologiesByProject, { "projectId": this.props.projectId }), "technologies")
    // };
  },

  render: function() {
    var currentProjectId = this.props.projectId;
    return (
      <div>
        <i className="glyphicon glyphicon-tags"></i>
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
