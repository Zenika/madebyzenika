var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var Link = Router.Link;

var TagTechnologies = require("../../technology/tagTechnologiesByProject.jsx");

var projectCard = React.createClass({

  render: function() {
    var project = this.props.project;

    return (
      <div className="col-md-4">
        <div className="card grey lighten-4">
          <div className="card-content">
              <h3 className="project-name">
                <Link to="projectDetail" params={{projectId: project.id}}>{project.name}</Link>
              </h3>

            <hr />
            <TagTechnologies projectId={project.id}/>

            <br/><b><i className="fa fa-map-marker"></i> {project.agency}</b>

            <p>{_.trunc(project.description, {"length": 130, "separator": " "})}</p>

          </div>

          <div className="card-action grey-text darken-2">
            <Link to="projectDetail" params={{projectId: project.id}} className="btn btn-default">+</Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = projectCard;
