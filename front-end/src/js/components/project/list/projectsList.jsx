var React = require("react");
var _ = require("lodash");

var ProjectCard = require("./projectCard.jsx");

var projectsList = React.createClass({

  getInitialState: function() {
    return {
      projects: this.props.projects
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ projects: nextProps.projects});
  },

  render: function() {
    return (
        <div className="container">
          <div className="row">
            {_.map(this.state.projects, function(project) {
              return <ProjectCard project={project} key={project.id}/>;
            })
            }
          </div>
       </div>
    );
  }

});

module.exports = projectsList;
