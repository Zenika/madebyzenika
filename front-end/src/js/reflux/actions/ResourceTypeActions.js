var Reflux = require("reflux");
var ResourceTypeService = require("../../utils/ServiceRest/ResourceTypeService");

var ResourceTypeActions = Reflux.createActions({
  "loadResourceTypes": {children: ["completed","failed"]},
  "loadResourceTypeById": {children: ["completed","failed"]}
});

// Get resource types
ResourceTypeActions.loadResourceTypes.listen(function() {

  var thisAction = this;

  ResourceTypeService.getResourceTypes().then(function(res) {

    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

// Get resource type by Id
ResourceTypeActions.loadResourceTypeById.listen(function(id) {

  var thisAction = this;

  ResourceTypeService.getResourceType(id).then(function(res) {
    return thisAction.completed(res.body);
  }, function(err) {
    return thisActions.failed(err);
  });

});

module.exports = ResourceTypeActions;
