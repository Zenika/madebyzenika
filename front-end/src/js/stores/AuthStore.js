var Fluxxor = require("fluxxor");
var ConstantsAuth = require("../constants/auth");
var store = require("../utils/LocalStorage/LocalStorage");

var AuthStore = Fluxxor.createStore({

  initialize: function() {

    this.userInfo = {},

    this.token = null;

    this.bindActions(
      ConstantsAuth.SET_LOGIN_USER, this.setAuthUserInfo,
      ConstantsAuth.SET_USER_IN_STORE, this.setUserInfo,
      ConstantsAuth.CLEAN_AUTH, this.cleanAuth
    );
  },

  setAuthUserInfo: function(authInfo) {
    this.userInfo = authInfo.userInfo;
    this.token = authInfo.token;
    store.set("currentUser", authInfo.userInfo);
    store.set("access_token", authInfo.token);

    this.emit("change");
  },

  setUserInfo: function(userInfo) {
    console.log(userInfo);
    this.userInfo = userInfo.userInfo;
    this.token = userInfo.token;
    this.emit("change");
  },

  isLoggedIn: function() {
    if(!_.isEmpty(this.userInfo) && !_.isEmpty(this.token)) {
      return true;
    }
    return false;
  },

  cleanAuth: function() {
    this.userInfo = {};
    this.token = null;
    store.remove("currentUser");
    store.remove("access_token");
  }

});

module.exports = AuthStore;
