var React = require("react");

var PageTitle = React.createClass({

  render: function() {

    return (
      <div className="row">
        <div className="col-lg-12">
          <h3 className="page-header"><i className={this.props.fonticon}></i> {this.props.title}</h3>
        </div>
      </div>
    );
  }
});

module.exports = PageTitle;
