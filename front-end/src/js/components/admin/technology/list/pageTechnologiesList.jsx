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
    TechnologyActions.loadTechnologies();
  },


  render: function() {
    var technologies = this.state.technologies;

    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <PageTitle title="Les technologies" />
                {/*<Link to="addTechnology" className="btn btn-success">Ajouter une Technologie</Link>*/}
                <FormTechnology />
                <Table responsive className="table-responsive">
                  <thead>
                    <tr>
                      <th>Nom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(technologies, function(technology) {
                      return (
                        <tr key={technology.id}>
                          <td>{technology.name}</td>
                          <td>
                              <Link to="updateTechnology" className="btn btn-warning" params={{technologyId: technology.id}}>
                                Modifier
                              </Link>
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
        </div>
    </div>
    )
  }

});

module.exports = PageTechnologiesList;
