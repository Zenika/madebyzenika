var React = require("react");
var Fluxxor = require("fluxxor");
var _ = require("lodash");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchForm = require("./SearchForm.jsx");

var BarFilter = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("ProjectTypeStore", "TechnologyStore")],

  componentDidMount: function() {
    this.getFlux().actions.ProjectTypeActions.loadProjectTypes();
    this.getFlux().actions.TechnologyActions.loadTechnologies();
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      technologies: flux.store("TechnologyStore").technologies,
      projectTypes: flux.store("ProjectTypeStore").projectTypes
    };
  },

  filterProjectType: function(type) {
    this.props.filterByType(type);
  },

  filterProjectName: function(search) {
    this.props.filterByName(search);
  },

  filterTechnology: function(technology) {
    this.props.filterByTechnology(technology);
  },

  render: function() {
    return (
        <div className="bar-filter">
          <div className="container">
            <ul className="nav nav-pills">
                  <li className="filterTitle">Par type <i className="fa fa-angle-right"></i></li>

                  <li onClick={this.filterProjectType.bind(this, "all")}>
                    <a>Tous</a>
                  </li>
                  { _.map(this.state.projectTypes, function(projectType) {
                    return (
                      <li onClick={this.filterProjectType.bind(this, projectType.id)}
                              key={projectType.id}>
                        <a>{_.capitalize(projectType.name)}</a>
                      </li>
                    );
                  }.bind(this))}
            </ul>
            <ul className="nav nav-pills">
                  <li className="filterTitle">Par stack technique <i className="fa fa-angle-right"></i></li>

                  <li onClick={this.filterTechnology.bind(this, "all")}>
                    <a>Toutes</a>
                  </li>
                  { _.map(this.state.technologies, function(technology) {
                    return (
                      <li onClick={this.filterTechnology.bind(this, technology.id)}
                              key={technology.id}>
                        <a>{_.capitalize(technology.name)}</a>
                      </li>
                    );
                  }.bind(this))}
            </ul>
            <ul className="nav nav-pills">
              <li className="filterTitle">Par nom de projet <i className="fa fa-angle-right"></i></li>
              <li>
                <SearchForm searchHandler={this.filterProjectName} />
              </li>
            </ul>
          </div>
      </div>
    );
  }
});

module.exports = BarFilter;

// <li>
//   <SearchForm searchHandler={this.filterProjectName} />
// </li>
