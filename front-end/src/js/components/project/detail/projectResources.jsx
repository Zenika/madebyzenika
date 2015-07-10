var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var moment = require("moment");
var _ = require("lodash");

var Bootstrap = require("react-bootstrap");
var Accordion = Bootstrap.Accordion;
var Panel = Bootstrap.Panel;

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ResourcesOfProject = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("ResourceStore")],

  getStateFromFlux: function(){
    var flux = this.getFlux().store("ResourceStore");
    return {
      resources: flux.resourcesByProject,
      projectId: this.props.projectId
    };
  },

  componentDidMount: function() {
    this.getFlux().actions.ResourceActions.loadResourcesByProject(this.props.projectId);
  },

  getResourceDate: function(timestamp) {
    moment.locale("fr");
    return moment(timestamp).format("Do MMMM YYYY");
  },

  render: function() {
    console.log(this.props.projectId);
    var projectId = this.state.projectId;
    return (
      <div>
        <h3><i className="icon-book-read-streamline"></i> ressources</h3>
          <Accordion>
            {_.map(this.state.resources, function(resource) {
              var lastModified = this.getResourceDate(resource.lastModified);
              return (
                <Panel header={resource.name} eventKey={resource.id}>
                  <a href={resource.link} target="_blank">Accèder à la ressource</a>
                </Panel>
              );
            }.bind(this))
            }
          </Accordion>
      </div>
    );
  },

  // componentWillUnmount:	function(){
  //   this.getFlux().actions.EventActions.clearEventsByProject();
  // }

});

module.exports = ResourcesOfProject;

// <ButtonDeleteResource projectId={projectId} resourceId={resource.id} />
