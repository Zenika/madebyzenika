var React = require("react");
var _ = require("lodash");
var Router = require("react-router");
var DropdownList = require("react-widgets").DropdownList;

var Reflux = require("reflux");
var UserStore = require("../../../../reflux/stores/UserStore");
var UserActions = require("../../../../reflux/actions/UserActions");

var ProjectStore = require("../../../../reflux/stores/ProjectStore");
var ProjectActions = require("../../../../reflux/actions/ProjectActions");

var ProjectService = require("../../../../utils/ServiceRest/ProjectService");

var PageTitle = require("../../pageTitle.jsx");

var PageProjectUsersList = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(UserStore), Reflux.connect(ProjectStore)],

  componentDidMount: function() {
      UserActions.loadUsers();
      ProjectActions.loadProject(this.getProjectId());
      UserActions.loadUsersByProject(this.getProjectId());
  },

  getInitialState: function() {
    return {
      updated: false
    }
  },

  getProjectId: function() {
      var params = this.context.router.getCurrentParams();
      return params.projectId;
  },

  render: function() {
    var usersNotInProject = this.getUsersNotInProject(this.state.users, this.state.usersByProject);
    var owner = {}
    var ownerId = this.state.project.owner;
    owner = _.first(_.filter(this.state.usersByProject, "id", ownerId));

    return (
      <div id="page-wrapper">
        <div id="wrapper">
              <div className="row">
                <div className="col-md-3">
                  {owner ? this.getOwnerThumb(owner) : null}
                </div>
                <div className="col-md-8">
                  <h3>Ajouter un membre au projet</h3>
                  <DropdownList
                   data={usersNotInProject}
                   textField="familyName"
                   caseSensitive={false}
                   minLength={2}
                   onSelect={this.addUserToProject}
                   itemComponent={ListUser}
                   filter="contains"  />
                </div>
              </div>
              <PageTitle title="Membres du projet" />
              <div className="row">
                {_.map(this.state.usersByProject, function(user) {
                  if(user.id != ownerId) {
                    return this.getUserThumb(user);
                  }
                }.bind(this))}
              </div>
        </div>
      </div>
    )
  },

  getUsersNotInProject: function(users, usersInProject) {
    _.remove(users, function(user) {
      return _.find(usersInProject, user);
    });
    return users;
  },

  getUserThumb: function(user) {
    return (
      <div key={user.id} className="col-md-2">
        <div className="thumbnail" >
          <img src={user.imageUrl} alt={user.familyName} height="100" width="100" />
          <div className="caption">
            <h3>{user.familyName} {user.givenName}</h3>
            <p><button className="btn btn-danger" onClick={this.removeFromProject.bind(null, user.id)} >Retirer du projet</button></p>
          </div>
        </div>
      </div>
    );
  },

  getOwnerThumb: function(owner) {
    return (
      <div className="thumbnail" >
        <img src={owner.imageUrl} alt={owner.familyName} height="100" width="100" />
        <div className="caption">
          <h4><b>Owner : {owner.familyName} {owner.givenName}</b></h4>
        </div>
      </div>
    );
  },

  addUserToProject: function(user) {
    console.log(user.id);
    var project = this.state.project;
    project.team.push(user.id);
    ProjectService.putProject(project.id, project).then(function(res) {
      this.setState({ project: res.body });
    }.bind(this), function(err) {
      console.log(err);
    });
  },

  removeFromProject: function(userId) {
    var project = this.state.project;
    var team = _.remove(project.team, function(memberId) {
      return memberId != userId;
    });
    project.team = team;

    ProjectService.putProject(project.id, project).then(function(res) {
      this.setState({ project: res.body });
    }.bind(this), function(err) {
      console.log(err);
    });
  },

  componentWillUnmount: function() {
    ProjectActions.clearProject();
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

module.exports = PageProjectUsersList;
