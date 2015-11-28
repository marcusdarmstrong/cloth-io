import React from 'react';
import { validate, NAME_REX, EMAIL_REX, PASSWORD_REX } from '../validator';

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
      emailHelperText: 'You\'ll use this to log in',
      passwordError: false,
      passwordHelperText: '6 or more characters',
    };
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
    this.setState({nameError: validate(NAME_REX, this.state.name)});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
    this.setState({emailError: validate(EMAIL_REX, this.state.email)});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
    this.setState({passwordError: validate(PASSWORD_REX, this.state.password)});
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">Display name:</label>
        <input type="text" autoFocus name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        <div className="form-helper">{this.state.nameHelperText}</div>
        <label htmlFor="email">Email address:</label>
        <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
        <div className="form-helper">{this.state.emailHelperText}</div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
        <div className="form-helper">{this.state.passwordHelperText}</div>
        <input type="submit" name="submit" value="Create account" />
      </form>
    );
  }
}

export default SignupForm;
