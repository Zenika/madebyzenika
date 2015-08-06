var React = require("react");
var Router = require("react-router");

var Bootstrap = require("react-bootstrap");
var OverlayMixin = Bootstrap.OverlayMixin;
var Modal = Bootstrap.Modal;

var ResourceService = require("../../../utils/ServiceRest/ResourceService");

var DeleteResource = React.createClass({

  mixins: [Router.Navigation, OverlayMixin],

  getInitialState: function() {
    return {
      resourceId: this.props.resourceId,
      projectId: this.props.projectId,
      isModalOpen: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ resourceId: nextProps.resourceId, projectId: nextProps.projectId });
  },

  onClick: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  onConfirm: function() {
    ResourceService.deleteResource(this.state.resourceId).then(function(res) {
      this.transitionTo("projectDetail", {projectId: this.state.projectId});
    }.bind(this), function(err) {
      console.log(err);
    });
  },

  render: function () {
   return (
      <div>
        <button className="btn btn-danger" onClick={this.onClick}>X</button>
      </div>
    );
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (
      <Modal title="Suppression d'une ressource" onRequestHide={this.onClick}>
        <div className="modal-body text-danger">
          <i className="fa fa-exclamation-triangle"></i> Etes vous sûr de vouloir supprimer cette ressource?
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={this.onClick}><b>Non</b></button>
          <button className="btn btn-danger" onClick={this.onConfirm}>Oui</button>
        </div>
      </Modal>
    );
  }

});

module.exports = DeleteResource;
