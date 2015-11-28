import React from 'react';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX } from '../validator';
import fetch from 'whatwg-fetch';

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      nameError: false,
      nameHelperText: 'Your name around the site. 4-20 characters.',
      emailError: false,
      emailHelperText: 'You\'ll use this to log in.',
      passwordError: false,
      passwordHelperText: 'Password must be 6 or more characters.',
    };
  }
  handleNameChange(e) {
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
      fetch('./api/isUsernameTaken?name=' + encodeURIComponent(newName))
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({nameHelperText: 'Looks good!'});
          } else {
            this.setState({nameHelperText: 'That name is taken. Try another.'});
          }
        });
    }
  }
  handleEmailChange(e) {
    const newEmail = e.target.value;
    const failure = !validate(EMAIL_REX, newEmail);
    this.setState({email: newEmail});
    this.setState({emailError: failure});
    if (failure) {
      this.setState({emailHelperText: 'Double check your email.'});
    } else {
      this.setState({emailHelperText: 'Looks good!'});
    }
  }
  handlePasswordChange(e) {
    const newPassword = e.target.value;
    const failure = !validate(PASSWORD_REX, newPassword);
    this.setState({password: newPassword});
    this.setState({passwordError: failure});
    if (failure) {
      this.setState({passwordHelperText: 'Password must be 6 or more characters.'});
    } else {
      this.setState({passwordHelperText: 'Looks good!'});
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.nameError || this.state.emailError || this.state.passwordError) {
      return;
    }
  }
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
    return (
      <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">Display name:</label>
        <input type="text" className={nameClass} autoFocus name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        <div className={'form-helper' + nameClass}>{this.state.nameHelperText}</div>
        <label htmlFor="email">Email address:</label>
        <input type="email" className={emailClass} name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
        <div className={'form-helper' + emailClass}>{this.state.emailHelperText}</div>
        <label htmlFor="password">Password:</label>
        <input type="password" className={passwordClass} name="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
        <div className={'form-helper' + passwordClass}>{this.state.passwordHelperText}</div>
        <input type="submit" name="submit" className={submitClass} value="Create account" />
      </form>
    );
  }
}

export default SignupForm;
