var React = require("react");
var Router = require("react-router");
var Bootstrap = require("react-bootstrap");
var OverlayMixin = Bootstrap.OverlayMixin;
var Modal = Bootstrap.Modal;

var EventService = require("../../../utils/ServiceRest/EventService");

var DeleteEvent = React.createClass({

  mixins: [Router.Navigation, OverlayMixin],

  getInitialState: function() {
    return {
      eventId: this.props.eventId,
      projectId: this.props.projectId,
      isModalOpen: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ eventId: nextProps.eventId, projectId: nextProps.projectId });
  },

  onClick: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  onConfirm: function() {
    EventService.deleteEvent(this.state.eventId).then(function(res) {
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
      <Modal title="Suppression d'un événement" onRequestHide={this.onClick}>
        <div className="modal-body text-danger">
          <i className="fa fa-exclamation-triangle"></i> Etes vous sûr de vouloir cet événement, ainsi que toutes les ressources associées ?
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
