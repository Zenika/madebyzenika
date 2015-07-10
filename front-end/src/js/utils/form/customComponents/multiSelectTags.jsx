var React = require("react");
var cx = require("classnames");
var Select = require("react-select");

var t = require("tcomb-form");

function multiSelectTag(locals) {

  var formGroupClasses = {
    "form-group": true,
    "has-feedback": true,
    "has-error": locals.hasError
  };

  // config contains your new params
    //var config = locals.config || {};

    var className = {
          "from-group": true,
          "has-error": locals.hasError
    };

  return (
    <div className={cx(formGroupClasses)}>

      {/* add a label if specified */}
      {locals.label ? <label className="control-label">{locals.label}</label> : null}

        <Select
             multi={true}
             value={locals.value}
             name={locals.name}
             options={locals.optionsData}
             onChange={locals.onChange}
             placeholder={locals.placeholder}
             classNames={className}
        />

      {locals.hasError ? <span className="help-block error-block">{locals.error}</span> : null}

      {/* add a help if specified */}
      {locals.help ? <span className="help-block">{locals.help}</span> : null}

    </div>
  );
}

var MultiSelectTag = React.createClass({displayName: "SearchComponent",
  getInitialState: function () {
    return {
      hasError: false,
      value: this.props.value
    };
  },
  componentWillReceiveProps: function (props) {
    this.setState({value: props.value});
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.value !== this.state.value ||
      nextState.hasError !== this.state.hasError ||
      nextProps.value !== this.props.value ||
      nextProps.options !== this.props.options ||
      nextProps.ctx.report.type !== this.props.ctx.report.type ||
      nextProps.onChange !== this.props.onChange;
  },

  onChange: function (value) {
    var newValue = value.split(",");
    this.setState({value: newValue}, function () {
      this.props.onChange(newValue);
    }.bind(this));
  },

  getValue: function () {
    var value = this.state.value;
    var result = t.validate(value, this.props.ctx.report.type);
    this.setState({hasError: !result.isValid()});
    return result;
  },

  render: function () {
    var opts = this.props.options || {};
    var ctx = this.props.ctx;

    // handling label
    var label = opts.label;
    if (!label && ctx.auto === "labels") {
      // if labels are auto generated, get the default label
      label = ctx.getDefaultLabel();
    }

    // handling placeholder
    var placeholder = null;
    // // labels have higher priority
    if (!label && ctx.auto !== "none") {
      placeholder = !t.Nil.is(opts.placeholder) ? opts.placeholder : ctx.getDefaultLabel();
    }

    // handling name attribute
    var name = opts.name || ctx.name;

    var value = this.state.value;

    // handling errors
    var error = t.Func.is(opts.error) ? opts.error(this.state.value) : opts.error;
    // using the custom template defined above
    return multiSelectTag({
      config: opts.config,
      disabled: opts.disabled,
      error: error,
      hasError: this.state.hasError,
      help: opts.help,
      label: label,
      name: name,
      onChange: this.onChange,
      placeholder: placeholder,
      value: value,
      optionsData: opts.optionsData
    });

  }
});

module.exports = MultiSelectTag;
