var React = require("react");
var Reflux = require("reflux");

var Reflux = require("reflux");
var TechnologyStore = require("../../../reflux/stores/TechnologyStore");
var TechnologyActions = require("../../../reflux/actions/TechnologyActions");

var projectTechnologies = React.createClass({

  mixins: [Reflux.connect(TechnologyStore)],

  componentWillReceiveProps: function(nextProps) {
    TechnologyActions.loadTechnologiesByProjectId(nextProps.projectId);
  },

  render: function() {
    var technologies = this.state.technologiesByProject[this.props.projectId];
    var nbTechnologies = 0;
    if( technologies ) nbTechnologies = technologies.length;

    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading"><h4><i className="fa fa-wrench"></i> {nbTechnologies} stacks techniques</h4></div>
          <div className="panel-body">
            {_.map(technologies, function(technology) {
              return (
                <div className="col-md-4 col-sm-4" key={technology.id}>
                  <div className="panel panel-default">
                    <div className="panel-body">
                      {technology.name}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
    )
  }
});

module.exports = projectTechnologies;
