var React = require("react");
var Router = require("react-router");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PageProjects = require("../project/list/pageProjectsList.jsx");

var projectsListByTechnology = React.createClass({

  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("ProjectStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux().store("ProjectStore");
    return {
      projects: flux.projectsByTechnology
    };
  },

  componentDidMount: function() {
    this.getFlux().actions.ProjectActions.loadProjectsByTechnology(this.getTechnologyId());
  },

  componentWillReceiveProps: function(nextProps) {
    this.getFlux().actions.ProjectActions.loadProjectsByTechnology(nextProps.params.technologyId);
  },

  getTechnologyId: function() {
    var params = this.context.router.getCurrentParams();
    return params.technologyId;
  },

  render: function() {
    return (
      <div>
        <PageProjects projects={this.state.projects} />
      </div>
    );
  }

});

module.exports = projectsListByTechnology;
