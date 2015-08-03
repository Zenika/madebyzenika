var Reflux = require("reflux");
var UserActions = require("../actions/UserActions");

var UserStore = Reflux.createStore({
  data: {
    users: [],
    usersByProject: [],
    user: {}
  },

  init: function() {
    this.listenToMany(UserActions);
  },

  onLoadUsersCompleted: function(users) {
    this.data.users = users;
    this.trigger(this.data);
  },

  onLoadUserByIdCompleted: function(user) {
    this.data.user = user;
    this.trigger(this.data);
  },

  onLoadUsersByProjectCompleted: function(usersByProject) {
    this.data.usersByProject = usersByProject;
    this.trigger(this.data);
  },

  onClearUsersByProject: function() {
    this.data.usersByProject = {};
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = UserStore;
