import React from 'react';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX } from '../validator';
import fetch from 'isomorphic-fetch';

export default class SignupForm extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired,
    loginUser: React.PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    nameError: false,
    nameHelperText: 'Your name around the site. 4-20 characters.',
    emailError: false,
    emailHelperText: 'You\'ll use this to log in.',
    passwordError: false,
    passwordHelperText: 'Password must be 6 or more characters.',
    submissionError: '',
  };

  handleNameChange = (e) => {
    const newName = e.target.value;
    const failure = !validate(NAME_REX, newName);
    this.setState({name: newName});
    this.setState({nameError: failure});
    if (failure) {
      if (newName.length < 4) {
        this.setState({nameHelperText: 'Make sure you have at least 4 characters.'});
      } else if (newName.length > 20) {
        this.setState({nameHelperText: 'Keep it under 20 characters.'});
      } else {
        this.setState({nameHelperText: 'Avoid any special characters.'});
      }
    } else {
      this.setState({nameHelperText: 'Checking...'});
      fetch('/api/isNameAvailable?name=' + encodeURIComponent(newName))
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({nameHelperText: 'Looks good!'});
          } else {
            this.setState({nameHelperText: 'That name is taken. Try another.'});
            this.setState({nameError: true});
          }
        });
    }
  };

  handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const failure = !validate(EMAIL_REX, newEmail);
    this.setState({email: newEmail});
    this.setState({emailError: failure});
    if (failure) {
      this.setState({emailHelperText: 'Double check your email.'});
    } else {
      this.setState({emailHelperText: 'Checking...'});
      fetch('/api/isEmailAvailable?email=' + encodeURIComponent(newEmail))
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({emailHelperText: 'Looks good!'});
          } else {
            this.setState({emailHelperText: 'That email is taken. Try another.'});
            this.setState({emailError: true});
          }
        });
    }
  };

  handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const failure = !validate(PASSWORD_REX, newPassword);
    this.setState({password: newPassword});
    this.setState({passwordError: failure});
    if (failure) {
      this.setState({passwordHelperText: 'Password must be 6 or more characters.'});
    } else {
      this.setState({passwordHelperText: 'Looks good!'});
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.nameError || this.state.emailError || this.state.passwordError) {
      return;
    }

    fetch('/api/createAccount', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.closeModal();
          this.props.loginUser(data.user);
        } else {
          this.setState({submissionError: 'Something went wrong.'});
        }
      });
  };

  render() {
    const nameClass = (this.state.nameError) ? ' error' : '';
    const emailClass = (this.state.emailError) ? ' error' : '';
    const passwordClass = (this.state.passwordError) ? ' error' : '';
    const submitClass =
          (!this.state.nameError
        && !this.state.emailError
        && !this.state.passwordError
        && this.state.name !== ''
        && this.state.email !== ''
        && this.state.password !== '')
      ? '' : 'disabled';
    const submissionError = (this.state.submissionError === '')
      ? null : (<p className="error">{this.state.submissionError}</p>);

    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        {submissionError}
        <label htmlFor="name">Display name:</label>
        <input type="text" className={nameClass} autoFocus name="name" value={this.state.name} onChange={this.handleNameChange} />
        <div className={'form-helper' + nameClass}>{this.state.nameHelperText}</div>
        <label htmlFor="email">Email address:</label>
        <input type="email" className={emailClass} name="email" value={this.state.email} onChange={this.handleEmailChange} />
        <div className={'form-helper' + emailClass}>{this.state.emailHelperText}</div>
        <label htmlFor="password">Password:</label>
        <input type="password" className={passwordClass} name="password" value={this.state.password} onChange={this.handlePasswordChange} />
        <div className={'form-helper' + passwordClass}>{this.state.passwordHelperText}</div>
        <input type="submit" name="submit" className={submitClass} value="Create account" />
      </form>
    );
  }
}
