var React = require("react");
var Reflux = require("reflux");

var UserStore = require("../../../reflux/stores/UserStore");
var UserActions = require("../../../reflux/actions/UserActions");

var Router = require("react-router");
var Link = Router.Link;


var listMembersProject = React.createClass({

  mixins: [Reflux.connect(UserStore)],

  // componentDidMount: function() {
  //   console.log(this.props.projectId);
  //   UserActions.loadUsersByProject(this.props.projectId);
  // },

  componentWillReceiveProps: function(nextProps) {
    UserActions.loadUsersByProject(nextProps.projectId);
  },

  render: function() {
    return (
      <div className="row">

      { _.map(this.state.usersByProject, function(user) {
        return (
          <div className="col-md-2">
              <blockquote>
                <img src={user.imageUrl} height="80" width="80" />
                <small>{user.familyName} {user.givenName}</small>
              </blockquote>
          </div>
        )
      })}
      </div>
    )
  }
});

module.exports = listMembersProject;
