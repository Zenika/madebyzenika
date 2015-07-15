var ConstantsAuth = require("../constants/auth");
var AuthService = require("../utils/ServiceRest/AuthService");
var Promise = require("promise");

var AuthActions = {

  getAuthorizationCode: function(code) {
    return new Promise(function(resolve, reject) {
      AuthService.getAuthorizationCodeEvents(code).then(function(res) {
        resolve(res.body);
      }, function(err) {
        console.log(err);
        reject({error: err});
      });
    });
  },

  setUserInStore: function(token, currentUser) {
    this.dispatch(ConstantsAuth.SET_USER_IN_STORE, {token: token, userInfo: currentUser});
  },

  setLoginUser: function(token, currentUser) {
    this.dispatch(ConstantsAuth.SET_LOGIN_USER, {token: token, userInfo: currentUser});
  },

  clearTokenAndUserInfo: function() {
    this.dispatch(ConstantsAuth.CLEAN_AUTH);
  }
};

module.exports = AuthActions;
