var Reflux = require("reflux");
var AuthService = require("../../utils/ServiceRest/AuthService");
var Promise = require("promise");

var authActions = Reflux.createActions([
    "setUserInStore",
    "setLoginUser",
    "clearTokenAndUserInfo"
]);

module.exports = authActions;
