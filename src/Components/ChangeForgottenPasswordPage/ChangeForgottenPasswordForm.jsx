import React from 'react';
import PropTypes from 'prop-types';
import PasswordInput from '../PasswordInput/PasswordInput';
import ConfirmPassword from '../ConfirmPassword/ConfirmPassword';

export default class ChangeForgotenPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
  }

  handleNewPasswordChange(newPassword) {
    this.setState({
      newPassword,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { newPassword } = this.state;
    this.props.onSubmit({ newPassword });
  }

  render() {
    return (
      <div className='changePasswordForm form'>
        <form name='changePasswordForm' onSubmit={this.handleSubmit}>
          <PasswordInput
            id='newPassword'
            onChange={this.handleNewPasswordChange}
            labelText='Новый пароль'
          />
          <ConfirmPassword
            id='confirmPassword'
            newPassword={this.state.newPassword}
            labelText='Подтвердите пароль'
          />
          <input
            type='submit'
            className='control-button control-button--blue'
            value={this.props.buttonText}
          />
        </form>
      </div>
    );
  }
}

ChangeForgotenPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};