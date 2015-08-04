var React = require("react");
var _ = require("lodash");
var Bootstrap = require("react-bootstrap");
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var Reflux = require("reflux");

var TechnologyStore = require("../../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../../reflux/actions/TechnologyActions");

var ProjectTypeStore = require("../../../../reflux/stores/ProjectTypeStore");
var ProjectTypeActions = require("../../../../reflux/actions/ProjectTypeActions");

var BarFilter = React.createClass({

  mixins: [Reflux.connect(ProjectTypeStore), Reflux.connect(TechnologyStore)],

  componentDidMount: function() {
    ProjectTypeActions.loadProjectTypes();
    TechnologyActions.loadTechnologies();
    TechnologyActions.loadTechnologiesByScore();
  },

  filterProjectType: function(type) {
    this.props.filterByType(type);
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
                  { _.map(this.state.technologiesByScore.slice(0, 4), function(technology) {
                    return (
                      <li onClick={this.filterTechnology.bind(this, technology.id)} key={technology.id}>
                        <a>{_.capitalize(technology.name) } ({technology.score})</a>
                      </li>
                    );
                  }.bind(this))}
                  <li>
                    <DropdownButton title='Autres technologies' bsStyle="default">
                      { _.map(this.state.technologiesByScore.slice(4), function(technology) {
                        return (
                          <li onClick={this.filterTechnology.bind(this, technology.id)}
                                  key={technology.id}>
                            <a>{_.capitalize(technology.name) } ({technology.score})</a>
                          </li>
                        );
                      }.bind(this))}
                    </DropdownButton>
                  </li>
            </ul>
          </div>
      </div>
    );
  }
});

module.exports = BarFilter;
