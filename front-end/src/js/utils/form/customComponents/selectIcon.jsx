var React = require("react");
var cx = require("classnames");
var t = require("tcomb-form");

var DropdownList = require("react-widgets").DropdownList;

var ListIcons = React.createClass({
  render: function() {
    var icon = this.props.item;
    var iconClass = "icon-"+icon;
    return (
      <span>
        <i className={iconClass}></i><b>{icon}</b>
      </span>
    );
  }
})

function selectIcon(locals) {
  var formGroupClasses = {
    "form-group": true,
    "has-feedback": true,
    "has-error": locals.hasError
  };

  var className = {
    "from-group": true,
    "has-error": locals.hasError
  };

  return (
    <div className={cx(formGroupClasses)}>

      {/* add a label if specified */}
      {locals.label ? <label className="control-label">{locals.label}</label> : null}
      <DropdownList
         data={locals.optionsData}
         textField="class"
         itemComponent={ListIcons}
         value={locals.value}
         name={locals.name}
         onChange={locals.onChange}
         caseSensitive={false}
         minLength={2}
         filter="contains"
       />

      {locals.hasError ? <span className="help-block error-block">{locals.error}</span> : null}

      {/* add a help if specified */}
      {locals.help ? <span className="help-block">{locals.help}</span> : null}

    </div>
  );
}

// <input value={locals.value}
//        name={locals.name}
//        onChange={locals.onChange}
//        placeholder={locals.placeholder}
//        classNames={className}
// />
var SelectIcon = React.createClass({displayName: "SelectIcon",
  getInitialState: function () {
    return {
      hasError: false,
      openCalendar: false,
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
    this.setState({value: value}, function () {
      this.props.onChange(value);
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
    // if (!label && ctx.auto === 'labels') {
    //   // if labels are auto generated, get the default label
    //   label = ctx.getDefaultLabel();
    // }

    // handling placeholder
    var placeholder = null;
    // // labels have higher priority
    // if (!label && ctx.auto !== 'none') {
    //   placeholder = !t.Nil.is(opts.placeholder) ? opts.placeholder : ctx.getDefaultLabel();
    // }

    // handling name attribute
    var name = opts.name || ctx.name;

    var value = this.state.value;

    // handling errors
    var error = t.Func.is(opts.error) ? opts.error(this.state.value) : opts.error;
    // using the custom template defined above
    return selectIcon({
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
      optionsData: opts.options
    });

  }
});

module.exports = SelectIcon;
