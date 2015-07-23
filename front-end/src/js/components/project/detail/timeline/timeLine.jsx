var React = require("react");
var _ = require("lodash");

var Reflux = require("reflux");

var EventStore = require("../../../../reflux/stores/EventStore");
var EventActions = require("../../../../reflux/actions/EventActions");

var ResourceStore = require("../../../../reflux/stores/ResourceStore");
var ResourceActions = require("../../../../reflux/actions/ResourceActions");

var ResourceBlock = require("./resourceBlock.jsx");
var EventBlock = require("./eventBlock.jsx");

var timeLine = React.createClass({

  mixins: [Reflux.connect(EventStore), Reflux.connect(ResourceStore)],

  componentDidMount: function() {
    var projectId = this.props.projectId;
    EventActions.loadEventsByProject(projectId);
    ResourceActions.loadResourcesByProject(projectId);
  },

  render: function() {
    var eventsAndResources = _.union(this.state.eventsByProject, this.flagResources(this.state.resourcesByProject));
    return (
      <div className="row">
        <div className="col-md-12">
          <section id="cd-timeline">
          	<div className="cd-timeline-block">
                  {_.map(eventsAndResources, function(eventOrResource) {
                    if(eventOrResource.isResource) {
                      return <ResourceBlock resource={eventOrResource} />
                    } else {
                      return <EventBlock event={eventOrResource} />
                    }
                  })}
              </div>
            </section>
          </div>
        </div>
    )
  },

  flagResources: function(resources) {
    var resourcesWithFlag = _.map(resources, function(resource) {
      return _.extend({}, resource, {isResource: true});
    });

    return resourcesWithFlag;
  }

});

module.exports = timeLine;
