var React = require("react");
var Fluxxor = require("fluxxor");
var _ = require("lodash");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BarFilter = require("./filter/barFilter.jsx");
var ProjectsList = require("./projectsList.jsx");
var CurrentFilter = require("./filter/currentFilter.jsx");

var LIMIT_FOR_PAGINATION = 3;

var pageProjects = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("ProjectStore", "TechnologyStore")],

  componentDidMount: function() {
    var flux = this.getFlux();
    var projectStore = this.getFlux().store("ProjectStore");

    flux.actions.ProjectActions.updatePagination(0, LIMIT_FOR_PAGINATION);

    flux.actions.ProjectActions.loadProjects(0, LIMIT_FOR_PAGINATION);
  },

  getStateFromFlux: function() {
    var fluxProject = this.getFlux().store("ProjectStore");
    return {
      projects: fluxProject.projectsFilter,
      filterByName: "",
      pagination: fluxProject.pagination,
      filter: fluxProject.filter
    };
  },

  projectFilter: function(pagination, filter) {
    var flux = this.getFlux();
    var skip = pagination.skip;
    var limit = pagination.limit;

    if(filter.type && filter.technologies) {
      flux.actions.ProjectActions.loadProjectsByTypeAndTechnologies(skip, limit, filter.type, filter.technologies);
    } else if(filter.type) {
      flux.actions.ProjectActions.loadProjectsByType(skip, limit, filter.type);
    } else if(filter.technologies) {
      flux.actions.ProjectActions.loadProjectsByTechnologies(skip, limit, filter.technologies);
    } else {
      flux.actions.ProjectActions.loadProjects(skip, limit);
    }
  },

  filterProjectsByType: function(type) {
    var filter = this.state.filter;
    var pagination = {skip: 0, limit: LIMIT_FOR_PAGINATION};
    this.getFlux().actions.ProjectActions.updatePagination(pagination.skip, pagination.limit);

    if(type === "all") {
      _.set(filter, "type", null);
    } else {
      _.set(filter, "type", type);
    }
    this.getFlux().actions.ProjectActions.getFilter(filter);

    this.projectFilter(pagination, filter);
  },

  filterProjectsByTechnologies: function(technologies) {
    var filter = this.state.filter;
    var pagination = {skip: 0, limit: LIMIT_FOR_PAGINATION};
    this.getFlux().actions.ProjectActions.updatePagination(pagination.skip, pagination.limit);

    if(technologies === "all") {
      _.set(filter, "technologies", null);
    } else {
      _.set(filter, "technologies", technologies);
    }

    this.getFlux().actions.ProjectActions.getFilter(filter);

    this.projectFilter(pagination, filter);
  },

  filterProjectsByName: function(filterText) {
    this.setState({ filterByName: filterText });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ projects: nextProps.projects});
  },

  render: function() {
    var flux = this.getFlux();
    var userFilter = flux.store("ProjectStore").filter;
    var projects = _.filter(this.state.projects, function(project) {
      return _.includes(project.name.toLowerCase(), this.state.filterByName.toLowerCase());
    }.bind(this));

        return (
          <div>
            <BarFilter filterByType ={this.filterProjectsByType}
                       filterByName ={this.filterProjectsByName}
                       filterByTechnology ={this.filterProjectsByTechnologies}
            />
            <CurrentFilter userFilter={userFilter} />
            <ProjectsList projects={projects}/>
            <button onClick={this.moreProjects}>More result</button>
         </div>
      );


  },

  moreProjects: function() {
    var flux = this.getFlux();

    var skip = flux.store("ProjectStore").pagination.skip + LIMIT_FOR_PAGINATION;
    var limit = flux.store("ProjectStore").pagination.limit;
    var pagination = { skip: skip, limit: limit};
    var filter = flux.store("ProjectStore").filter;

    flux.actions.ProjectActions.updatePagination(skip, limit);
    this.projectFilter(pagination, filter);
  }

});

module.exports = pageProjects;



// }
// else {
//   return (
//     <div>
//       <BarFilter filterByType={this.filterProjectsByType}
//                 filterByName={this.filterProjectsByName} />
//
//       <div className="container">
//         <div className="row">
//           <div className="valign-wrapper">
//             <h4 className="valign">Aucun projets correpond � la recherche</h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//
// }
