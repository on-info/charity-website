import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  getClasses() {
    return classNames({
      'form--field': true,
      'label-move-up': this.state.password,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className='form--box'>
        <input
          id={this.props.id}
          value={this.state.password}
          onChange={this.handlePasswordChange}
          type={this.props.type}
          className={this.getClasses()}
          minLength={this.props.minLength}
          required={this.props.required}
        />
        <label htmlFor={this.props.id} className='form--placeholder'>
          {this.props.labelText}
        </label>
      </div>
    );
  }
}

InputField.defaultProps = {
  required: '',
  minLength: '',
};

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.string,
  minLength: PropTypes.string,
};
