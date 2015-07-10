var ProjectStore = require("./ProjectStore");
var ProjectTypeStore = require("./ProjectTypeStore");

var EventStore = require("./EventStore");
var EventTypeStore = require("./EventTypeStore");

var TechnologyStore = require("./TechnologyStore");

var ResourceStore = require("./ResourceStore");
var ResourceTypeStore = require("./ResourceTypeStore");

var AuthStore = require("./AuthStore");
var UserStore = require("./UserStore");

module.exports = {
  ProjectStore: new ProjectStore(),
  ProjectTypeStore: new ProjectTypeStore(),
  EventStore: new EventStore(),
  EventTypeStore: new EventTypeStore(),
  TechnologyStore: new TechnologyStore(),
  ResourceStore: new ResourceStore(),
  ResourceTypeStore: new ResourceTypeStore(),
  AuthStore: new AuthStore(),
  UserStore: new UserStore()
};
