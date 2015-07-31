var React = require("react");

var store = require("./LocalStorage");
var _ = require("lodash");

var Reflux = require("reflux");
var ProjectTypeStore = require("../../reflux/stores/ProjectTypeStore");
var ProjectTypeActions = require("../../reflux/actions/ProjectTypeActions");


var ProjectType = React.createClass({

  mixins: [Reflux.connect(ProjectTypeStore)],

  componentDidMount: function() {
    ProjectTypeActions.loadProjectTypes()
  },

  getInitialState: function() {
    return {
      projectTypeId: this.props.projectType,
    };
  },

  componentWillReceiveProps: function(nextProps) {
      this.setState({ projectTypeId: nextProps.projectType });
  },

  render: function() {
    if(_.isEmpty(this.getProjectTypes())) {
      this.fillLocalStorage(this.state.projectTypes);
    }

    var projectType = _.first(_.filter(this.state.projectTypes, "id", this.state.projectTypeId));
    
    if(projectType) {
      if (this.props.icon && this.props.color && projectType) {
        var style = { background: projectType.color };
        return (
          <div className="cd-timeline-img cd-icon" style={style}>
            <h3><i className={projectType.classicon}></i></h3>
          </div>
        );

      } else if(this.props.icon){

        return <i className={projectType.classicon}></i>;

      } else if(this.props.label){

        var style = { backgroundColor: projectType.color };
        return <span className="label" style={style} >{_.capitalize(projectType.name)}</span>;

      } else {

        return  <span>{_.capitalize(projectType.name)}</span>;
      }
    }else {
      return <span></span>;
    }
  },

  fillLocalStorage: function(projectTypes) {
    console.log(projectTypes);
    store.set("projectTypes", projectTypes);
  },

  getProjectTypes: function() {
    return store.get("projectTypes");
  }

});

module.exports = ProjectType;
