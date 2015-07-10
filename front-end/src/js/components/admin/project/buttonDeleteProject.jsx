var React = require("react");
var Router = require("react-router");
var Bootstrap = require("react-bootstrap");
var OverlayMixin = Bootstrap.OverlayMixin;
var Modal = Bootstrap.Modal;

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DeleteEvent = React.createClass({

  mixins: [Router.Navigation, FluxMixin, StoreWatchMixin("ProjectStore"), OverlayMixin],

  getStateFromFlux: function() {
    return {
      projectId: this.props.projectId,
      isModalOpen: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ projectId: nextProps.projectId });
  },

  onClick: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  onConfirm: function() {
    this.getFlux().actions.ProjectActions.deleteProject(this.state.projectId).then(function() {
        this.transitionTo("projects");
    }.bind(this), function(err) {
        console.log(err);
    });
  },

  render: function () {
   return (
        <a onClick={this.onClick}>Supprimer</a>
    );
  },

  renderOverlay: function() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (
      <Modal title="Suppression d'un projet" onRequestHide={this.onClick}>
        <div className="modal-body text-danger">
          <i className="fa fa-exclamation-triangle"></i> Etes vous sûr de vouloir supprimer ce projet, ainsi que tous les événements et ressources associées ?
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={this.onClick}><b>Non</b></button>
          <button className="btn btn-danger" onClick={this.onConfirm}>Oui</button>
        </div>
      </Modal>
    );
  }

});

module.exports = DeleteEvent;
