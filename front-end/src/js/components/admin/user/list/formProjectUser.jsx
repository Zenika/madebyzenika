var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var DropdownList = require("react-widgets").DropdownList;

var formProjectUser = React.createClass({

  getInitialState: function() {
      return {
        users: this.props.users,
        usersInProject: this.props.usersInProject
      }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ users: nextProps.users, usersInProject: nextProps.usersInProject });
  },

  render: function() {
    var usersNotInProject = this.getUsersNotInProject(this.state.users, this.state.usersInProject);
    return (
        <div className="col-md-8">
          <h3>Ajouter un membre au projet</h3>
          <DropdownList
            data={usersNotInProject}
            textField="familyName"
            caseSensitive={false}
            minLength={2}
            onSelect={this.props.addUser}
            itemComponent={ListUser}
            filter="contains"  />
        </div>
    )
  },

  getUsersNotInProject: function(users, usersInProject) {
    _.remove(users, function(user) {
      return _.find(usersInProject, user);
    });
    return users;
  }

});

var ListUser = React.createClass({
  render: function() {
    var user = this.props.item;
    return (
      <span>
        <img src={user.imageUrl} height="40" width="40" />
        <strong> { user.familyName }</strong>
        { " " + user.givenName }
      </span>
    );
  }
})

module.exports = formProjectUser;
