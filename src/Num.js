import React from 'react/addons';

const Num = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      min: -Infinity,
      max: Infinity,
      step: 1,
      editable: true,
      onChange: () => {}
    };
  },
  getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue || ''
    };
  },
  render() {
    let
      cx = React.addons.classSet,
      classes1 = cx({
        'cm-adjust-minus': true,
        'disabled': this.props.min === this.state.value
      }),
      classes2 = cx({
        'cm-adjust-plus': true,
        'disabled': this.props.max === this.state.value
      }),
      input;

    if (this.props.editable) {
      input = <input type="tel" className="cm-adjust-view" value={this.state.value} onChange={this.onChange} onBlur={this.onBlur} />
    } else {
      input = <span className="cm-adjust-view">{this.state.value}</span>
    }

    return (
      <div className="cm-num-adjust">
        <span className={classes1} onClick={this.down}></span>
        {input}
        <span className={classes2} onClick={this.up}></span>
      </div>
    );
  },
  step(type) {
    let
      props = this.props,
      value = +this.state.value,
      stepNum = +props.step || 1;

    if (props.disabled) return;
    value = type === 'down' ? value - stepNum : value + stepNum;

    this.setValue(value);
  },
  down() {
    this.step('down');
  },
  up() {
    this.step('up');
  },
  setValue(value) {
    let props = this.props;
    if (value !== '' && (value > props.max || value < props.min)) return;
    this.setState({value: value});
    props.onChange(value);
  },
  onChange(e) {
    let value = e.target.value.trim();
    if (value === '') {
      this.setValue('');
    } else if (!isNaN(value)) {
      this.setValue(+value);
    }
  },
  onBlur(e) {
    if (e.target.value.trim() === '') {
      let value = this.getInitialState().value;
      value !== '' && this.setValue(value);
    }
  }
});

export default Num;