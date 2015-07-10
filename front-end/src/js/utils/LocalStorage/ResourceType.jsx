var React = require("react");
var Fluxxor = require("fluxxor");
var store = require("./LocalStorage");
var _ = require("lodash");

var ResourceTypeActions = require("../../actions/ResourceTypeActions.js");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ResourceType = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin("ResourceTypeStore")],

  componentDidMount: function() {
    var flux = this.getFlux();
    if(_.isEmpty(this.getResourceTypes())) {
      flux.actions.ResourceTypeActions.loadResourceTypes();
    }
  },

  getStateFromFlux: function() {
    if(_.isEmpty(this.getResourceTypes())) {
      this.fillLocalStorage(this.getFlux().store("ResourceTypeStore").resourceTypes);
    }

    return {
      resourceTypeId: this.props.resourceType,
      resourceTypes: this.getResourceTypes()
    };
  },

  render: function() {
    var resourceType = _.first(_.filter(this.state.resourceTypes, "id", this.state.resourceTypeId));
    if(resourceType) {
      if(this.props.icon && this.props.color){
        var style = { background: resourceType.color };
        return (
          <div className="cd-timeline-img cd-icon" style={style}>
            <h3><i className={resourceType.classicon}></i></h3>
          </div>
        );

      } else if(this.props.icon){

        return <i className={resourceType.classicon}></i>;

      }  else if(this.props.label){

        var style = { backgroundColor: resourceType.color };
        return <span className="label" style={style} >{_.capitalize(resourceType.name)}</span>;

      } else {
        return  <span>{_.capitalize(this.getResourceTypeName(this.state.resourceTypeId))}</span>;
      }
    } else {
      return <span></span>
    }
  },

  getResourceTypeName: function(resourceTypeId) {
    return _.pluck(_.filter(this.state.resourceTypes, "id", resourceTypeId), "name");
  },

  fillLocalStorage: function(resourceTypes) {
    store.set("resourceTypes", resourceTypes);
  },

  getResourceTypes: function() {
    return store.get("resourceTypes");
  }

});

module.exports = ResourceType;
