var Fluxxor = require("fluxxor");
var React = require("react");
var Router = require("react-router");

require("!style!css!less!../assets/less/style.less");

// CSS multi select field
require("!style!css!react-select/dist/default.css");

// CSS super select field
require("!style!css!react-super-select/lib/react-super-select.css");

// CSS date time field
require("!style!css!less!react-widgets/lib/less/react-widgets.less");

var Stores = require("./stores/Stores");
var Actions = require("./actions/Actions");
var Routes = require("./routes.jsx");

var flux = new Fluxxor.Flux(Stores, Actions);

// flux.on("dispatch", function(type, payload) {
//   console.log("Dispatch:", type, payload);
// });

Router.run(Routes, function(Handler, state) {
  React.render(
    <Handler flux={flux} />,
      document.getElementById("app")
  );
});
