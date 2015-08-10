var Reflux = require("reflux");
var AuthService = require("../../utils/ServiceRest/AuthService");
var Promise = require("promise");

var AuthActions = Reflux.createActions({
    "loadAuthorizationCode": {children: ["completed","failed"]},
    "setUserInStore": "setUserInStore",
    "setLoginUser": "setLoginUser",
    "clearTokenAndUserInfo": "clearTokenAndUserInfo"
});

AuthActions.loadAuthorizationCode.listen(function(code) {

  var thisAction = this;

  AuthService.getAuthorizationCodeEvents(code).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    console.log(err);
  });

});


module.exports = AuthActions;
