var React = require("react");
var Router = require("react-router");

require("!style!css!less!../assets/less/style.less");

// CSS multi select field
require("!style!css!react-select/dist/default.css");

// CSS super select field
require("!style!css!react-super-select/lib/react-super-select.css");

// CSS date time field
require("!style!css!less!react-widgets/lib/less/react-widgets.less");

var Routes = require("./routes.jsx");

Router.run(Routes, function(Handler, state) {
  React.render(
    <Handler />,
      document.body
  );
});
