var React = require("react");

var PageTitle = React.createClass({

  render: function() {
    return (
      <h3 className="page-header"><i className={this.props.fonticon}></i> {this.props.title}</h3>
    );
  }
});

module.exports = PageTitle;
