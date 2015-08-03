var Reflux = require("reflux");
var UserService = require("../../utils/ServiceRest/UserService");

var UserActions = Reflux.createActions({
    "loadUsers": {children: ["completed","failed"]},
    "loadUserById": {children: ["completed","failed"]},
    "loadUsersByProject": {children: ["completed","failed"]},
    "clearUsersByProject": "clearUsersByProject"
});

UserActions.loadUsers.listen(function() {

  var thisAction = this;

  UserService.getUsers().then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

UserActions.loadUserById.listen(function(id) {
  var thisAction = this;

  UserService.getUserById(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

UserActions.loadUsersByProject.listen(function(projectId) {
  var thisAction = this;

  if(projectId) {
    UserService.getUsersByProject(projectId).then(function(res) {
      return thisAction.completed(res.body);
    }, function(err) {
      return thisActions.failed(err);
    });
  }
});

module.exports = UserActions;
