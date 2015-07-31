var React = require("react");
var store = require("./LocalStorage");
var _ = require("lodash")

var Reflux = require("reflux");
var ResourceTypeStore = require("../../reflux/stores/ResourceTypeStore");
var ResourceTypeActions = require("../../reflux/actions/ResourceTypeActions");

var ResourceType = React.createClass({

  mixins: [Reflux.connect(ResourceTypeStore)],

  componentDidMount: function() {
      ResourceTypeActions.loadResourceTypes();
  },

  getInitialState: function() {
    return {
      resourceTypeId: this.props.resourceType
    };
  },

  componentWillReceiveProps: function(nextProps) {
      this.setState({ resourceTypeId: nextProps.resourceType });
  },

  render: function() {
    if(_.isEmpty(this.getResourceTypes())) {
      this.fillLocalStorage(this.state.resourceTypes);
    }

    var resourceType = _.first(_.filter(this.state.resourceTypes, "id", this.state.resourceTypeId));

    if(resourceType) {
      if(this.props.icon && this.props.color){
        var style = { background: resourceType.color };
        return (
          <div className="cd-timeline-img cd-icon" style={style}>
            <h3><i className={"fa fa-"+resourceType.classicon}></i></h3>
          </div>
        );

      } else if(this.props.icon){

        return <i className={"fa fa-"+resourceType.classicon}></i>;

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
