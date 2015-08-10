var Reflux = require("reflux");

var AuthActions = require("../actions/AuthActions");
var AuthService = require("../../utils/ServiceRest/AuthService");

var store = require("../../utils/LocalStorage/LocalStorage");

var authStore = Reflux.createStore({
  data: {
    userInfo: {},
    token: null,
    isLoggedIn: false
  },

  init: function() {
    this.listenToMany(AuthActions);
  },

  onSetUserInStore: function(userInfo, token) {
    this.data.userInfo = userInfo;
    this.data.token = token;
    this.data.isLoggedIn = true;
    this.trigger(this.data);
  },

  onLoadAuthorizationCodeCompleted: function(authInfo) {
    store.set("currentUser", authInfo.userInfo);
    store.set("access_token", authInfo.access_token);
    this.onSetUserInStore(authInfo.userInfo, authInfo.access_token)
    this.trigger(this.data);
  },

  onClearTokenAndUserInfo: function() {
    this.data.userInfo = {};
    this.data.token = {};
    this.data.isLoggedIn = false;
    store.remove("currentUser");
    store.remove("access_token");
    this.trigger(this.data);
  },

  isLoggedIn: function() {
    if(!_.isEmpty(this.data.userInfo) && !_.isEmpty(this.data.token)) {
      this.data.isLoggedIn = true;
    } else {
      this.data.isLoggedIn = false;
    }

    this.trigger(this.data);
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = authStore;
