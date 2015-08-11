var React = require("react");
var _ = require("lodash");
var moment = require("moment");
var Reflux = require("reflux");

var ResourceType = require("../../../../utils/LocalStorage/ResourceType.jsx");

var ResourceBlock = React.createClass({

  componentDidMount: function() {
    moment.locale("fr");
  },

  getInitialState: function() {
      return {
        resource: this.props.resource
      }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ resource: nextProps.resource });
  },

  render: function() {
    var resource = this.state.resource;

    return (
      <div className="cd-timeline-block">
        <ResourceType resourceType={resource.resourceType} icon={true} color={true} />

        <div className="cd-timeline-content">
          Dernière modification {moment(resource.lastModified).fromNow()}
          <h2>{resource.name}</h2>
          <ResourceType resourceType={resource.resourceType} label={true} />
          <p><a href={resource.link} target="_blank" className="btn btn-primary">Accèder à la ressource</a></p>
          <span className="cd-date"></span>
        </div>
      </div>
    );
  }

});

module.exports = ResourceBlock;
