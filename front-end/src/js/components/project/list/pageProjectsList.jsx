var React = require("react");
var Reflux = require("reflux");

var _ = require("lodash");

var BarFilter = require("./filter/barFilter.jsx");
var ProjectsList = require("./projectsList.jsx");
var CurrentFilter = require("./filter/currentFilter.jsx");

var ProjectStore = require("../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../reflux/actions/ProjectActions");

var FilterStore = require("../../../reflux/stores/FilterStore");
var FilterActions = require("../../../reflux/actions/FilterActions");

var SearchForm = require("./filter/SearchForm.jsx");

var pageProjects = React.createClass({

  mixins: [Reflux.connect(ProjectStore), Reflux.connect(FilterStore)],

  componentDidMount: function() {
    ProjectActions.loadProjects();
  },

  getInitialState: function() {
    return {
      filterByName: ""
    };
  },

  filterProjectsByType: function(type) {
    if(type === "all") {
      FilterActions.getFilter("all", FilterStore.data.filter.technologies);
    } else {
      FilterActions.getFilter(type, FilterStore.data.filter.technologies);
    }
  },

  filterProjectsByTechnologies: function(technologies) {
    if(technologies === "all") {
      FilterActions.getFilter(FilterStore.data.filter.type, "all");
    } else {
      FilterActions.getFilter(FilterStore.data.filter.type, technologies);
    }
  },

  filterProjectsByName: function(filterText) {
    this.setState({ filterByName: filterText });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ projects: nextProps.projects});
  },

  render: function() {
    var projects = _.filter(this.state.projects, function(project) {
      return _.includes(project.name.toLowerCase(), this.state.filterByName.toLowerCase());
    }.bind(this));

        return (
          <div>
            <BarFilter filterByType ={this.filterProjectsByType}
                       filterByName ={this.filterProjectsByName}
                       filterByTechnology ={this.filterProjectsByTechnologies}
            />
          <CurrentFilter filter={FilterStore.data.filter} />
          <SearchForm searchHandler={this.filterProjectsByName} />
          {this.getProjects(projects)}
            {/*<button onClick={this.moreProjects}>More result</button>*/}
         </div>
      );


  },

  getProjects: function(projects) {
      if(projects.length > 0) {
        return <ProjectsList projects={projects} />
      } else {
        return (
          <div className="container">
            <div className="row">
              <h3 className="text-center">Aucun projet correspond à votre recherche</h3>
            </div>
         </div>
        );
      }
  },

  moreProjects: function() {
    // var flux = this.getFlux();
    //
    // var skip = flux.store("ProjectStore").pagination.skip + LIMIT_FOR_PAGINATION;
    // var limit = flux.store("ProjectStore").pagination.limit;
    // var pagination = { skip: skip, limit: limit};
    // var filter = flux.store("ProjectStore").filter;
    //
    // flux.actions.ProjectActions.updatePagination(skip, limit);
    // this.projectFilter(pagination, filter);
  }

});

module.exports = pageProjects;
