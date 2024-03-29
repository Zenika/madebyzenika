var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var Reflux = require("reflux");
var TechnologyStore = require("../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../reflux/actions/TechnologyActions");

var Bootstrap = require("react-bootstrap");
var Table = Bootstrap.Table;
var Button = Bootstrap.Button;

var PageTitle = require("../pageTitle.jsx");

var FormTechnology = require("./formTechnology.jsx");

var PageTechnologiesList = React.createClass({

  mixins: [Reflux.connect(TechnologyStore)],

  componentDidMount: function() {
    TechnologyActions.loadTechnologiesByScore();
  },

  refreshTechnologiesTable: function() {
    TechnologyActions.loadTechnologies();
  },

  render: function() {
    var technologies = this.state.technologiesByScore;

    return (
      <div>
          <PageTitle title="Les stacks techniques des projets" />
            <FormTechnology technoAdded={this.refreshTechnologiesTable}/>
            <hr />
            <h4>Liste des technologies</h4>
              <ul className="list-group">
              {_.map(technologies, function(technology) {
                return (
                  <div className="col-md-4" key={technology.id}>
                    <li className="list-group-item">
                      <span className="badge">{technology.score}</span>
                      {technology.name}
                    </li>
                  </div>
                );
            })}
            </ul>
    </div>
    )
  }

});

module.exports = PageTechnologiesList;
