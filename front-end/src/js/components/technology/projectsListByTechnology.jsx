var React = require("react");
var Router = require("react-router");

var PageProjects = require("../project/list/pageProjectsList.jsx");

var projectsListByTechnology = React.createClass({

  mixins: [Router.Navigation],

  componentDidMount: function() {
  },

  componentWillReceiveProps: function(nextProps) {
  },

  getTechnologyId: function() {
    var params = this.context.router.getCurrentParams();
    return params.technologyId;
  },

  render: function() {
    return (
      <div>
        <PageProjects projects={this.state.projects} />
      </div>
    );
  }

});

module.exports = projectsListByTechnology;
