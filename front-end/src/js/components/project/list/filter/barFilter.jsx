var React = require("react");
var _ = require("lodash");

var Reflux = require("reflux");
var TechnologyStore = require("../../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../../reflux/actions/TechnologyActions");

var ProjectTypeStore = require("../../../../reflux/stores/ProjectTypeStore");
var ProjectTypeActions = require("../../../../reflux/actions/ProjectTypeActions");

var SearchForm = require("./SearchForm.jsx");

var BarFilter = React.createClass({

  mixins: [Reflux.connect(ProjectTypeStore), Reflux.connect(TechnologyStore)],

  componentDidMount: function() {
    ProjectTypeActions.loadProjectTypes();
    TechnologyActions.loadTechnologies();
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
