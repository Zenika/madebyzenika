var React = require("react");
var Reflux = require("reflux");

var UserStore = require("../../../reflux/stores/UserStore");
var UserActions = require("../../../reflux/actions/UserActions");

var Router = require("react-router");
var Link = Router.Link;


var listMembersProject = React.createClass({

  mixins: [Reflux.connect(UserStore)],

  componentDidMount: function() {
    UserActions.loadUsersByProject(this.props.projectId);
  },

  componentWillReceiveProps: function(nextProps) {
    UserActions.loadUsersByProject(nextProps.projectId);
  },

  render: function() {
    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading"><h4><i className="fa fa-users"></i> {this.state.usersByProject.length} membres</h4></div>
          <div className="panel-body">
            { _.map(this.state.usersByProject, function(user) {
              return (
                <div key={user.id} className=".col-lg-3 col-md-3 col-sm-3 col-xs-3">
                  <div className="panel">
                    <div className="panel-heading">
                      <img src={user.imageUrl}  height="80" width="80" />
                    </div>
                    <div className="panel-body">
                      <h5><b>{user.familyName}</b> <br /> {user.givenName}</h5>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  },

  componentWillUnmount: function() {
    UserActions.clearUsersByProject();
  }
});

module.exports = listMembersProject;
